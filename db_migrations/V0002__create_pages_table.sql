-- Создание таблицы страниц для админки
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    h1 VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по slug
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_published ON pages(is_published);

-- Вставка примерных страниц
INSERT INTO pages (slug, h1, title, description, content) VALUES
('/', 'Премиум отели Москвы', 'Премиум отели Москвы - бронирование номеров класса люкс', 'Эксклюзивная подборка премиум отелей Москвы. Роскошные номера, VIP-сервис, лучшие локации. Забронируйте отель премиум-класса прямо сейчас.', 'Главная страница с каталогом отелей'),
('about', 'О нашем сервисе премиум бронирования', 'О нас - сервис бронирования премиум отелей Москвы', 'Мы специализируемся на бронировании отелей премиум-класса в Москве. Индивидуальный подход, эксклюзивные предложения.', 'Страница о компании'),
('contacts', 'Контакты премиум консьерж-сервиса', 'Контакты - служба бронирования элитных отелей', 'Свяжитесь с нашей службой консьерж для бронирования премиум отелей в Москве. Работаем 24/7.', 'Контактная информация');
