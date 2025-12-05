-- Создание таблицы отелей
CREATE TABLE IF NOT EXISTS hotels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    features TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавление индексов для быстрого поиска
CREATE INDEX idx_hotels_location ON hotels(location);
CREATE INDEX idx_hotels_price ON hotels(price);

-- Вставка данных отелей
INSERT INTO hotels (name, location, price, image_url, features) VALUES
('Grand Palace Moscow', 'Тверская улица', 45000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg', ARRAY['Личный дворецкий', 'Панорамный ресторан', 'SPA-комплекс']),
('Boutique Lux Arbat', 'Центр Москвы', 38000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg', ARRAY['5 звёзд', 'Бутик-отель', 'VIP-зона']),
('Premium Towers', 'Москва-Сити', 52000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg', ARRAY['Апартаменты люкс', 'Панорамный вид', 'Консьерж 24/7']),
('Imperial Suite Hotel', 'Патриаршие пруды', 62000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg', ARRAY['Исторический особняк', 'Винный погреб', 'Библиотека и камин']),
('Skyline Residence', 'Кутузовский проспект', 48000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg', ARRAY['Панорамные окна', 'Фитнес-клуб', 'Крытый бассейн']),
('Royal Garden Hotel', 'Замоскворечье', 42000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg', ARRAY['Парковая зона', 'Терраса на крыше', 'Michelin ресторан']),
('Metropolitan Elite', 'Остоженка', 55000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg', ARRAY['Дизайнерские интерьеры', 'Арт-галерея', 'Сигарная комната']),
('Crystal Palace', 'Рублёвское шоссе', 68000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg', ARRAY['Загородный комплекс', 'Конюшня и верховая езда', 'Частный пляж']),
('Heritage Boutique', 'Чистые пруды', 41000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg', ARRAY['Антикварная мебель', 'Камерная атмосфера', 'Домашний кинотеатр']),
('Platinum Prestige', 'Пресненская набережная', 72000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg', ARRAY['Пентхаусы премиум', 'Вертолётная площадка', 'Личный шеф-повар']),
('Renaissance Mansion', 'Сретенский бульвар', 58000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg', ARRAY['Особняк XIX века', 'Мраморный холл', 'Коллекция живописи']),
('Velvet Suite', 'Маросейка', 46000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg', ARRAY['Барокко интерьеры', 'Спа с хаммамом', 'Бутик-отель 12 номеров']),
('Diamond Heights', 'Воробьёвы горы', 65000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg', ARRAY['Панорама на Москву-реку', 'Infinity бассейн', 'Michelin гастрономия']),
('Noble Residence', 'Поварская улица', 53000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg', ARRAY['Дворянская усадьба', 'Частный двор-сад', 'Камины в номерах']),
('Emerald Park Hotel', 'Серебряный Бор', 75000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg', ARRAY['Лесопарковая зона', 'Частный причал', 'Эко-веллнес центр']),
('Marquis Collection', 'Большая Никитская', 61000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg', ARRAY['Люксовая классика', 'Библиотека с редкими изданиями', 'Личный сомелье']),
('Aurora Sky Suites', 'Золотые ключи', 70000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg', ARRAY['Панорамные люксы', 'SPA с видом на Кремль', 'Бутлерский сервис']),
('Imperial Garden', 'Крымский вал', 49000, 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg', ARRAY['Парк Горького рядом', 'Терраса с видом', 'Йога-студия на крыше']);
