import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    conn.set_session(autocommit=True)
    return conn

def escape_sql_value(value):
    """Escape value for Simple Query Protocol"""
    if value is None:
        return 'NULL'
    return "'" + str(value).replace("'", "''").replace("\\", "\\\\") + "'"

def verify_token(token: str, cur) -> bool:
    if not token:
        return False
    cur.execute(
        f"SELECT user_id FROM sessions WHERE token = {escape_sql_value(token)} AND expires_at > NOW()"
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
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
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
            
            query = f'''INSERT INTO pages (slug, h1, title, description, content) 
                       VALUES ({escape_sql_value(body_data.get('slug', ''))}, 
                               {escape_sql_value(body_data.get('h1', ''))}, 
                               {escape_sql_value(body_data.get('title', ''))}, 
                               {escape_sql_value(body_data.get('description', ''))}, 
                               {escape_sql_value(body_data.get('content', ''))}) 
                       RETURNING *'''
            
            cur.execute(query)
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
            
            query = f'''UPDATE pages 
                       SET slug = {escape_sql_value(body_data.get('slug', ''))}, 
                           h1 = {escape_sql_value(body_data.get('h1', ''))}, 
                           title = {escape_sql_value(body_data.get('title', ''))}, 
                           description = {escape_sql_value(body_data.get('description', ''))}, 
                           content = {escape_sql_value(body_data.get('content', ''))}, 
                           updated_at = CURRENT_TIMESTAMP 
                       WHERE id = {escape_sql_value(page_id)} 
                       RETURNING *'''
            
            cur.execute(query)
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
            
            cur.execute(f'DELETE FROM pages WHERE id = {escape_sql_value(page_id)}')
            
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
        import traceback
        error_details = {
            'error': str(e),
            'type': type(e).__name__,
            'traceback': traceback.format_exc()
        }
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
