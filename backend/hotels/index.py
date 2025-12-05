import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def verify_token(token: str, cur) -> bool:
    if not token:
        return False
    cur.execute(
        'SELECT user_id FROM sessions WHERE token = %s AND expires_at > NOW()',
        (token,)
    )
    return cur.fetchone() is not None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления отелями в админ-панели
    Позволяет создавать, читать, обновлять и удалять отели
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cur.execute('SELECT * FROM hotels ORDER BY id')
            hotels = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(hotel) for hotel in hotels], default=str),
                'isBase64Encoded': False
            }
        
        headers = event.get('headers', {})
        token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
        
        if not verify_token(token, cur):
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Требуется авторизация'}),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute(
                '''INSERT INTO hotels (name, location, price, image_url, features) 
                   VALUES (%s, %s, %s, %s, %s) RETURNING *''',
                (
                    body_data.get('name'),
                    body_data.get('location'),
                    body_data.get('price'),
                    body_data.get('image_url'),
                    body_data.get('features', [])
                )
            )
            conn.commit()
            new_hotel = cur.fetchone()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(new_hotel), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            path_params = event.get('pathParams', {})
            hotel_id = path_params.get('id')
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute(
                '''UPDATE hotels 
                   SET name = %s, location = %s, price = %s, 
                       image_url = %s, features = %s, updated_at = CURRENT_TIMESTAMP 
                   WHERE id = %s RETURNING *''',
                (
                    body_data.get('name'),
                    body_data.get('location'),
                    body_data.get('price'),
                    body_data.get('image_url'),
                    body_data.get('features', []),
                    hotel_id
                )
            )
            conn.commit()
            updated_hotel = cur.fetchone()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(updated_hotel), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            path_params = event.get('pathParams', {})
            hotel_id = path_params.get('id')
            
            cur.execute('UPDATE hotels SET updated_at = CURRENT_TIMESTAMP WHERE id = %s', (hotel_id,))
            conn.commit()
            
            return {
                'statusCode': 204,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': '',
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
