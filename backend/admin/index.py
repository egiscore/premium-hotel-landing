import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для управления страницами в админ-панели
    Позволяет создавать, читать, обновлять и удалять страницы с SEO-полями
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
    
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cur.execute('SELECT * FROM pages ORDER BY created_at DESC')
            pages = cur.fetchall()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(page) for page in pages], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute(
                '''INSERT INTO pages (slug, h1, title, description, content) 
                   VALUES (%s, %s, %s, %s, %s) RETURNING *''',
                (
                    body_data.get('slug'),
                    body_data.get('h1'),
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('content', '')
                )
            )
            conn.commit()
            new_page = cur.fetchone()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(new_page), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            path_params = event.get('pathParams', {})
            page_id = path_params.get('id')
            body_data = json.loads(event.get('body', '{}'))
            
            cur.execute(
                '''UPDATE pages 
                   SET slug = %s, h1 = %s, title = %s, description = %s, 
                       content = %s, updated_at = CURRENT_TIMESTAMP 
                   WHERE id = %s RETURNING *''',
                (
                    body_data.get('slug'),
                    body_data.get('h1'),
                    body_data.get('title'),
                    body_data.get('description'),
                    body_data.get('content', ''),
                    page_id
                )
            )
            conn.commit()
            updated_page = cur.fetchone()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(updated_page), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'DELETE':
            path_params = event.get('pathParams', {})
            page_id = path_params.get('id')
            
            cur.execute('DELETE FROM pages WHERE id = %s', (page_id,))
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
