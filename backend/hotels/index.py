import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not found')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления каталогом отелей (получение, создание, обновление, удаление)
    '''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            hotel_id = params.get('id')
            
            if hotel_id:
                cur.execute(
                    'SELECT * FROM t_p19515115_premium_hotel_landin.hotels WHERE id = %s AND is_active = TRUE',
                    (hotel_id,)
                )
                hotel = cur.fetchone()
                
                if not hotel:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Hotel not found'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(hotel), ensure_ascii=False, default=str),
                    'isBase64Encoded': False
                }
            else:
                cur.execute(
                    'SELECT * FROM t_p19515115_premium_hotel_landin.hotels WHERE is_active = TRUE ORDER BY display_order, name'
                )
                hotels = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(h) for h in hotels], ensure_ascii=False, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            cur.execute('''
                INSERT INTO t_p19515115_premium_hotel_landin.hotels 
                (name, location, address, price, description, image_url, features, amenities, 
                 rating, stars, rooms_count, phone, email, website, check_in_time, check_out_time, display_order)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING *
            ''', (
                body.get('name'),
                body.get('location'),
                body.get('address'),
                body.get('price'),
                body.get('description'),
                body.get('image_url'),
                body.get('features', []),
                body.get('amenities', []),
                body.get('rating', 5.0),
                body.get('stars', 5),
                body.get('rooms_count'),
                body.get('phone'),
                body.get('email'),
                body.get('website'),
                body.get('check_in_time', '14:00'),
                body.get('check_out_time', '12:00'),
                body.get('display_order', 0)
            ))
            
            new_hotel = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(new_hotel), ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            hotel_id = body.get('id')
            
            if not hotel_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Hotel ID is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                UPDATE t_p19515115_premium_hotel_landin.hotels 
                SET name = %s, location = %s, address = %s, price = %s, description = %s,
                    image_url = %s, features = %s, amenities = %s, rating = %s, stars = %s,
                    rooms_count = %s, phone = %s, email = %s, website = %s,
                    check_in_time = %s, check_out_time = %s, display_order = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING *
            ''', (
                body.get('name'),
                body.get('location'),
                body.get('address'),
                body.get('price'),
                body.get('description'),
                body.get('image_url'),
                body.get('features', []),
                body.get('amenities', []),
                body.get('rating', 5.0),
                body.get('stars', 5),
                body.get('rooms_count'),
                body.get('phone'),
                body.get('email'),
                body.get('website'),
                body.get('check_in_time', '14:00'),
                body.get('check_out_time', '12:00'),
                body.get('display_order', 0),
                hotel_id
            ))
            
            updated_hotel = cur.fetchone()
            conn.commit()
            
            if not updated_hotel:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Hotel not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(updated_hotel), ensure_ascii=False, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            hotel_id = params.get('id')
            
            if not hotel_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Hotel ID is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                'UPDATE t_p19515115_premium_hotel_landin.hotels SET is_active = FALSE WHERE id = %s RETURNING id',
                (hotel_id,)
            )
            
            deleted = cur.fetchone()
            conn.commit()
            
            if not deleted:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Hotel not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'id': deleted['id']}),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
