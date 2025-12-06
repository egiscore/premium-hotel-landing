-- Insert real premium hotels of Moscow (only new entries, old data preserved)
INSERT INTO t_p19515115_premium_hotel_landin.hotels 
(name, location, address, price, description, image_url, features, amenities, rating, stars, rooms_count, phone, email, website, check_in_time, check_out_time, display_order, is_active)
VALUES
('The Ritz-Carlton Moscow', 'Тверская', 'ул. Тверская, д. 3', 45000, 
'Легендарный отель в самом сердце Москвы с видом на Кремль и Красную площадь. Роскошные номера, ресторан высокой кухни O2 Lounge и премиальный спа-центр.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2bfba87f-8b15-4046-ab76-fb0cf5cd38aa.jpg',
ARRAY['Вид на Кремль', 'Ресторан O2 Lounge', 'Спа-центр Ritz-Carlton'],
ARRAY['Крытый бассейн', 'Фитнес-центр 24/7', 'Консьерж-сервис', 'Трансфер на Rolls-Royce', 'Детский клуб', 'Банкетные залы'],
4.9, 5, 334, '+7 (495) 225-88-88', 'rc.moscow@ritzcarlton.com', 'https://www.ritzcarlton.com/moscow', 
'15:00', '12:00', 1, true),

('Four Seasons Hotel Moscow', 'Охотный Ряд', 'ул. Охотный Ряд, д. 2', 42000,
'Элегантный отель в историческом центре Москвы, в двух шагах от Красной площади. Сочетание классической архитектуры и современного комфорта.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/8f8024e3-00b7-4a6b-ae85-f18fb1afa467.jpg',
ARRAY['Историческое здание', 'Панорамный спа', 'Ресторан Quadrum'],
ARRAY['Спа-центр премиум класса', 'Крытый бассейн с подогревом', 'Детская программа', 'Библиотека', 'Бизнес-центр', 'Камердинер'],
4.9, 5, 180, '+7 (495) 531-55-55', 'res.moscow@fourseasons.com', 'https://www.fourseasons.com/moscow',
'14:00', '12:00', 2, true),

('The St. Regis Moscow Nikolskaya', 'Никольская', 'ул. Никольская, д. 12', 50000,
'Роскошный отель в неоклассическом стиле с видом на Кремль. Знаменитый сервис дворецких и изысканная кухня.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a5ee0841-513b-4814-8359-c7f97dad1196.jpg',
ARRAY['Персональный дворецкий', 'Вид на Кремль', 'Ресторан русской кухни Astor'],
ARRAY['Спа Iridium', 'Крытый бассейн', 'Дворецкий 24/7', 'Частный трансфер', 'Винный погреб', 'Сигарная комната'],
5.0, 5, 210, '+7 (495) 787-88-88', 'moscow@stregis.com', 'https://www.marriott.com/stregis',
'15:00', '12:00', 3, true),

('Ararat Park Hyatt Moscow', 'Неглинная', 'ул. Неглинная, д. 4', 38000,
'Современный роскошный отель напротив Большого театра. Превосходный дизайн номеров и ресторан Ararat с авторской кухней.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2caf8410-240e-4f25-9866-00594bdcf646.jpg',
ARRAY['Напротив Большого театра', 'Ресторан Ararat', 'Дизайнерские интерьеры'],
ARRAY['Спа-центр с бассейном', 'Фитнес-центр Technogym', 'Услуги консьержа', 'Бизнес-центр', 'Детское меню', 'Терраса'],
4.8, 5, 215, '+7 (495) 783-12-34', 'moscow.park@hyatt.com', 'https://www.hyatt.com/ararat-park',
'14:00', '12:00', 4, true),

('Swissôtel Krasnye Holmy', 'Таганская', 'Космодамианская наб., д. 52, стр. 6', 28000,
'Современный небоскреб с панорамными видами на Москву. Идеальное сочетание швейцарского качества и московского гостеприимства.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/0db3c400-3d6e-48a9-a007-d9ed4dde6b11.jpg',
ARRAY['Панорамные виды', 'Высота 34 этажа', 'Ресторан City Space Bar'],
ARRAY['Панорамный бассейн', 'Спа-центр Pürovel', 'Детский клуб', 'Конференц-залы', 'Фитнес 24/7', 'Вертолетная площадка'],
4.7, 5, 234, '+7 (495) 787-98-00', 'moscow@swissotel.com', 'https://www.swissotel.com/moscow',
'15:00', '12:00', 5, true),

('Hotel Metropol Moscow', 'Театральная', 'Театральный проезд, д. 2', 35000,
'Исторический отель в стиле модерн напротив Большого театра. Объект культурного наследия с уникальными интерьерами 1905 года.',
'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796fb2f3-bc81-4edc-9951-c85aa74f360e.jpg',
ARRAY['Памятник архитектуры', 'Историческая мозаика', 'Ресторан Savva'],
ARRAY['Исторический спа-центр', 'Библиотека', 'Консьерж-сервис', 'Кондитерская', 'Банкетные залы', 'Музей отеля'],
4.8, 5, 362, '+7 (499) 501-78-00', 'info@metropol-moscow.ru', 'https://www.metropol-moscow.com',
'14:00', '12:00', 6, true);