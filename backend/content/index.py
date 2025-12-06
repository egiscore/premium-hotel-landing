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
    API для управления контентом сайта (все тексты)
    Позволяет получать и обновлять текстовые блоки
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
            params = event.get('queryStringParameters') or {}
            page = params.get('page')
            
            if page:
                cur.execute(f"SELECT * FROM site_content WHERE page = {escape_sql_value(page)} ORDER BY key")
            else:
                cur.execute('SELECT * FROM site_content ORDER BY page, key')
            
            content = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(item) for item in content], default=str),
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
        
        if method == 'PUT':
            path_params = event.get('pathParams', {})
            content_id = path_params.get('id')
            body_data = json.loads(event.get('body', '{}'))
            
            query = f'''UPDATE site_content 
                       SET value = {escape_sql_value(body_data.get('value', ''))}, 
                           description = {escape_sql_value(body_data.get('description', ''))}, 
                           page = {escape_sql_value(body_data.get('page', ''))}, 
                           updated_at = CURRENT_TIMESTAMP 
                       WHERE id = {escape_sql_value(content_id)} 
                       RETURNING *'''
            
            cur.execute(query)
            updated_content = cur.fetchone()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(updated_content), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            query = f'''INSERT INTO site_content (page, key, value, description) 
                       VALUES ({escape_sql_value(body_data.get('page', ''))}, 
                               {escape_sql_value(body_data.get('key', ''))}, 
                               {escape_sql_value(body_data.get('value', ''))}, 
                               {escape_sql_value(body_data.get('description', ''))}) 
                       RETURNING *'''
            
            cur.execute(query)
            new_content = cur.fetchone()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(dict(new_content), default=str),
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
