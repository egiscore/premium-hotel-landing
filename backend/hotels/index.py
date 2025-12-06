import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    if not dsn:
        raise ValueError('DATABASE_URL not found')
    conn = psycopg2.connect(dsn)
    conn.set_session(autocommit=True)
    return conn

def escape_sql_value(value):
    """Escape value for Simple Query Protocol"""
    if value is None:
        return 'NULL'
    if isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    if isinstance(value, (int, float)):
        return str(value)
    if isinstance(value, list):
        escaped_items = [escape_sql_value(item) for item in value]
        return "ARRAY[" + ", ".join(escaped_items) + "]"
    # String escaping
    return "'" + str(value).replace("'", "''").replace("\\", "\\\\") + "'"

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
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            hotel_id = params.get('id')
            
            if hotel_id:
                query = f"SELECT * FROM t_p19515115_premium_hotel_landin.hotels WHERE id = {escape_sql_value(hotel_id)} AND is_active = TRUE"
                cur.execute(query)
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
                query = 'SELECT * FROM t_p19515115_premium_hotel_landin.hotels WHERE is_active = TRUE ORDER BY display_order, name'
                cur.execute(query)
                hotels = cur.fetchall()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps([dict(h) for h in hotels], ensure_ascii=False, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            
            query = f'''
                INSERT INTO t_p19515115_premium_hotel_landin.hotels 
                (name, location, address, price, description, image_url, features, amenities, 
                 rating, stars, rooms_count, phone, email, website, check_in_time, check_out_time, display_order)
                VALUES (
                    {escape_sql_value(body.get('name'))},
                    {escape_sql_value(body.get('location'))},
                    {escape_sql_value(body.get('address'))},
                    {escape_sql_value(body.get('price'))},
                    {escape_sql_value(body.get('description'))},
                    {escape_sql_value(body.get('image_url'))},
                    {escape_sql_value(body.get('features', []))},
                    {escape_sql_value(body.get('amenities', []))},
                    {escape_sql_value(body.get('rating', 5.0))},
                    {escape_sql_value(body.get('stars', 5))},
                    {escape_sql_value(body.get('rooms_count'))},
                    {escape_sql_value(body.get('phone'))},
                    {escape_sql_value(body.get('email'))},
                    {escape_sql_value(body.get('website'))},
                    {escape_sql_value(body.get('check_in_time', '14:00'))},
                    {escape_sql_value(body.get('check_out_time', '12:00'))},
                    {escape_sql_value(body.get('display_order', 0))}
                )
                RETURNING *
            '''
            
            cur.execute(query)
            new_hotel = cur.fetchone()
            
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
            
            query = f'''
                UPDATE t_p19515115_premium_hotel_landin.hotels 
                SET name = {escape_sql_value(body.get('name'))}, 
                    location = {escape_sql_value(body.get('location'))}, 
                    address = {escape_sql_value(body.get('address'))}, 
                    price = {escape_sql_value(body.get('price'))}, 
                    description = {escape_sql_value(body.get('description'))},
                    image_url = {escape_sql_value(body.get('image_url'))}, 
                    features = {escape_sql_value(body.get('features', []))}, 
                    amenities = {escape_sql_value(body.get('amenities', []))}, 
                    rating = {escape_sql_value(body.get('rating', 5.0))}, 
                    stars = {escape_sql_value(body.get('stars', 5))},
                    rooms_count = {escape_sql_value(body.get('rooms_count'))}, 
                    phone = {escape_sql_value(body.get('phone'))}, 
                    email = {escape_sql_value(body.get('email'))}, 
                    website = {escape_sql_value(body.get('website'))},
                    check_in_time = {escape_sql_value(body.get('check_in_time', '14:00'))}, 
                    check_out_time = {escape_sql_value(body.get('check_out_time', '12:00'))}, 
                    display_order = {escape_sql_value(body.get('display_order', 0))},
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = {escape_sql_value(hotel_id)}
                RETURNING *
            '''
            
            cur.execute(query)
            updated_hotel = cur.fetchone()
            
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
            
            query = f"UPDATE t_p19515115_premium_hotel_landin.hotels SET is_active = FALSE WHERE id = {escape_sql_value(hotel_id)} RETURNING id"
            cur.execute(query)
            deleted = cur.fetchone()
            
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
                'body': json.dumps({'success': True, 'message': 'Hotel deleted successfully'}),
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
        import traceback
        error_details = {
            'error': str(e),
            'type': type(e).__name__,
            'traceback': traceback.format_exc()
        }
        print(f"Error in handler: {error_details}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(error_details),
            'isBase64Encoded': False
        }
    
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
