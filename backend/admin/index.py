import json
import os
from typing import Dict, Any
import psycopg

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg.connect(dsn, autocommit=True)

def verify_token(token: str, cur) -> bool:
    if not token:
        return False
    cur.execute(
        "SELECT user_id FROM sessions WHERE token = %s AND expires_at > NOW()",
        (token,)
    )
    return cur.fetchone() is not None

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
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                
                if method == 'GET':
                    cur.execute('SELECT * FROM pages ORDER BY created_at DESC')
                    pages = cur.fetchall()
                    columns = [desc[0] for desc in cur.description]
                    pages_list = [dict(zip(columns, row)) for row in pages]
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(pages_list, default=str),
                        'isBase64Encoded': False
                    }
                
                elif method == 'POST':
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
                    
                    body_data = json.loads(event.get('body', '{}'))
                    
                    cur.execute(
                        "INSERT INTO pages (slug, h1, title, description, content) VALUES (%s, %s, %s, %s, %s) RETURNING *",
                        (
                            body_data.get('slug', ''),
                            body_data.get('h1', ''),
                            body_data.get('title', ''),
                            body_data.get('description', ''),
                            body_data.get('content', '')
                        )
                    )
                    new_page = cur.fetchone()
                    columns = [desc[0] for desc in cur.description]
                    page_dict = dict(zip(columns, new_page))
                    
                    return {
                        'statusCode': 201,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(page_dict, default=str),
                        'isBase64Encoded': False
                    }
                
                elif method == 'PUT':
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
                    
                    path_params = event.get('pathParams', {})
                    page_id = path_params.get('id')
                    body_data = json.loads(event.get('body', '{}'))
                    
                    cur.execute(
                        "UPDATE pages SET slug = %s, h1 = %s, title = %s, description = %s, content = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                        (
                            body_data.get('slug', ''),
                            body_data.get('h1', ''),
                            body_data.get('title', ''),
                            body_data.get('description', ''),
                            body_data.get('content', ''),
                            page_id
                        )
                    )
                    updated_page = cur.fetchone()
                    columns = [desc[0] for desc in cur.description]
                    page_dict = dict(zip(columns, updated_page))
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(page_dict, default=str),
                        'isBase64Encoded': False
                    }
                
                elif method == 'DELETE':
                    path_params = event.get('pathParams', {})
                    page_id = path_params.get('id')
                    
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
                    
                    cur.execute('DELETE FROM pages WHERE id = %s', (page_id,))
                    
                    return {
                        'statusCode': 204,
                        'headers': {
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': '',
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
