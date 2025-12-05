ALTER TABLE site_content ADD COLUMN IF NOT EXISTS temp_col TEXT;

UPDATE site_content SET temp_col = 'temp' WHERE key = 'hero_title';

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_details', 'Подробнее', 'Текст кнопки просмотра деталей отеля', 'home'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_details');

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_book', 'Забронировать', 'Текст кнопки бронирования', 'home'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_book');

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_login', 'Войти', 'Текст кнопки входа', 'login'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_login');

INSERT INTO site_content (key, value, description, page) 
SELECT 'login_title', 'Вход в админ-панель', 'Заголовок страницы входа', 'login'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'login_title');

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_add', 'Добавить', 'Текст кнопки добавления', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_add');

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_save', 'Сохранить', 'Текст кнопки сохранения', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_save');

INSERT INTO site_content (key, value, description, page) 
SELECT 'button_logout', 'Выйти', 'Текст кнопки выхода', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM site_content WHERE key = 'button_logout');
