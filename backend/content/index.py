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
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                
                if method == 'GET':
                    params = event.get('queryStringParameters') or {}
                    page = params.get('page')
                    
                    if page:
                        cur.execute("SELECT * FROM site_content WHERE page = %s ORDER BY key", (page,))
                    else:
                        cur.execute('SELECT * FROM site_content ORDER BY page, key')
                    
                    content = cur.fetchall()
                    columns = [desc[0] for desc in cur.description]
                    content_list = [dict(zip(columns, row)) for row in content]
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(content_list, default=str),
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
                    
                    cur.execute(
                        "UPDATE site_content SET value = %s, description = %s, page = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s RETURNING *",
                        (
                            body_data.get('value', ''),
                            body_data.get('description', ''),
                            body_data.get('page', ''),
                            content_id
                        )
                    )
                    updated_content = cur.fetchone()
                    columns = [desc[0] for desc in cur.description]
                    content_dict = dict(zip(columns, updated_content))
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(content_dict, default=str),
                        'isBase64Encoded': False
                    }
                
                elif method == 'POST':
                    body_data = json.loads(event.get('body', '{}'))
                    
                    cur.execute(
                        "INSERT INTO site_content (page, key, value, description) VALUES (%s, %s, %s, %s) RETURNING *",
                        (
                            body_data.get('page', ''),
                            body_data.get('key', ''),
                            body_data.get('value', ''),
                            body_data.get('description', '')
                        )
                    )
                    new_content = cur.fetchone()
                    columns = [desc[0] for desc in cur.description]
                    content_dict = dict(zip(columns, new_content))
                    
                    return {
                        'statusCode': 201,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(content_dict, default=str),
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
