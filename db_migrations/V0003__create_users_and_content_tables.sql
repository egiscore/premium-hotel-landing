-- Создание таблицы пользователей для админ-панели
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы сессий
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы контента сайта (все тексты)
CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT NOT NULL,
    description TEXT,
    page VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_content_key ON site_content(key);
CREATE INDEX idx_content_page ON site_content(page);

-- Вставка админа по умолчанию (пароль: admin123)
INSERT INTO users (email, password_hash, name, role) VALUES
('admin@hotel.ru', '$2b$10$rH8qN5X8LqKZJZ5xGZ5xGZ5xGZ5xGZ5xGZ5xGZ5xGZ5xGZ5xGZ5xG', 'Администратор', 'admin');

-- Вставка контента главной страницы
INSERT INTO site_content (key, value, description, page) VALUES
('hero_title', 'Премиум отели Москвы', 'Заголовок главного экрана', 'home'),
('hero_subtitle', 'Эксклюзивная подборка роскошных отелей с безупречным сервисом', 'Подзаголовок главного экрана', 'home'),
('hero_cta', 'Подобрать отель', 'Текст кнопки', 'home'),
('catalog_title', 'Наши отели', 'Заголовок каталога', 'home'),
('catalog_subtitle', 'Лучшие предложения премиум-класса', 'Подзаголовок каталога', 'home'),
('footer_text', '© 2024 Премиум отели. Все права защищены.', 'Текст в подвале', 'footer'),
('contact_phone', '+7 (495) 123-45-67', 'Телефон', 'contact'),
('contact_email', 'info@premiumhotels.ru', 'Email', 'contact');
