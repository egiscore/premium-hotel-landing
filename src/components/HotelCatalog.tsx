import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import HotelGallery from '@/components/HotelGallery';
import AdminPanel from '@/components/AdminPanel';

const initialHotels = [
  {
    id: 1,
    name: 'Grand Palace Moscow',
    location: 'Тверская улица',
    price: '45 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
    features: ['Личный дворецкий', 'Панорамный ресторан', 'SPA-комплекс'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg'
    ]
  },
  {
    id: 2,
    name: 'Boutique Lux Arbat',
    location: 'Центр Москвы',
    price: '38 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
    features: ['5 звёзд', 'Бутик-отель', 'VIP-зона'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg'
    ]
  },
  {
    id: 3,
    name: 'Premium Towers',
    location: 'Москва-Сити',
    price: '52 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
    features: ['Апартаменты люкс', 'Панорамный вид', 'Консьерж 24/7'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg'
    ]
  },
  {
    id: 4,
    name: 'Imperial Suite Hotel',
    location: 'Патриаршие пруды',
    price: '62 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
    features: ['Исторический особняк', 'Винный погреб', 'Библиотека и камин'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg'
    ]
  },
  {
    id: 5,
    name: 'Skyline Residence',
    location: 'Кутузовский проспект',
    price: '48 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
    features: ['Панорамные окна', 'Фитнес-клуб', 'Крытый бассейн'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg'
    ]
  },
  {
    id: 6,
    name: 'Royal Garden Hotel',
    location: 'Замоскворечье',
    price: '42 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
    features: ['Парковая зона', 'Терраса на крыше', 'Michelin ресторан'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg'
    ]
  },
  {
    id: 7,
    name: 'Metropolitan Elite',
    location: 'Остоженка',
    price: '55 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
    features: ['Дизайнерские интерьеры', 'Арт-галерея', 'Сигарная комната'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg'
    ]
  },
  {
    id: 8,
    name: 'Crystal Palace',
    location: 'Рублёвское шоссе',
    price: '68 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
    features: ['Загородный комплекс', 'Конюшня и верховая езда', 'Частный пляж'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg'
    ]
  },
  {
    id: 9,
    name: 'Heritage Boutique',
    location: 'Чистые пруды',
    price: '41 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg',
    features: ['Антикварная мебель', 'Камерная атмосфера', 'Домашний кинотеатр'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg'
    ]
  },
  {
    id: 10,
    name: 'Platinum Prestige',
    location: 'Пресненская набережная',
    price: '72 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
    features: ['Пентхаусы премиум', 'Вертолётная площадка', 'Личный шеф-повар'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg'
    ]
  },
  {
    id: 11,
    name: 'Renaissance Mansion',
    location: 'Сретенский бульвар',
    price: '58 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
    features: ['Особняк XIX века', 'Мраморный холл', 'Коллекция живописи'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg'
    ]
  },
  {
    id: 12,
    name: 'Velvet Suite',
    location: 'Маросейка',
    price: '46 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
    features: ['Барокко интерьеры', 'Спа с хаммамом', 'Бутик-отель 12 номеров'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg'
    ]
  },
  {
    id: 13,
    name: 'Diamond Heights',
    location: 'Воробьёвы горы',
    price: '65 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg',
    features: ['Панорама на Москву-реку', 'Infinity бассейн', 'Michelin гастрономия'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg'
    ]
  },
  {
    id: 14,
    name: 'Noble Residence',
    location: 'Поварская улица',
    price: '53 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
    features: ['Дворянская усадьба', 'Частный двор-сад', 'Камины в номерах'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg'
    ]
  },
  {
    id: 15,
    name: 'Emerald Park Hotel',
    location: 'Серебряный Бор',
    price: '75 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
    features: ['Лесопарковая зона', 'Частный причал', 'Эко-веллнес центр'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg'
    ]
  },
  {
    id: 16,
    name: 'Marquis Collection',
    location: 'Большая Никитская',
    price: '61 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg',
    features: ['Люксовая классика', 'Библиотека с редкими изданиями', 'Личный сомелье'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3c835bb4-38a9-4781-bebc-44e5043cb98f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/796369cd-2d4f-44a3-8c48-33ecde17dce3.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f4351dfc-af0a-40ca-af7b-5d16bd226665.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/78a59793-8126-4de6-84a1-177d1257ff6a.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3331b63b-c5a0-4698-a0ff-2150dc7142f1.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7d964120-5bfe-447b-acdc-618c8763ef31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6c07f5f4-4077-4f7a-9c3b-9b6128b75a8c.jpg'
    ]
  },
  {
    id: 17,
    name: 'Aurora Sky Suites',
    location: 'Золотые ключи',
    price: '70 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg',
    features: ['Панорамные люксы', 'SPA с видом на Кремль', 'Бутлерский сервис'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7435c9a6-7696-43ad-a85c-1e0ea674083e.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4193a67b-3fb4-4b82-aef8-b88d41ac408f.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c8299e4a-9525-4f37-9541-1c8a816e7eb7.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/cf76723f-e195-46b5-b0f1-18b27cbeccde.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/08733a9c-41c0-40b7-88bb-30ac87c9ebe2.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a0c9aea2-5dc6-4d14-a219-0072e564aa6f.jpg'
    ]
  },
  {
    id: 18,
    name: 'Imperial Garden',
    location: 'Крымский вал',
    price: '49 000',
    image: 'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
    features: ['Парк Горького рядом', 'Терраса с видом', 'Йога-студия на крыше'],
    gallery: [
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2eb3e6b5-57ab-4089-9e31-c1a63feac6d0.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/2f125914-e98c-4afb-ab59-69767abcec31.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5c7f4c61-4f62-4990-baa9-12a6ad198f52.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/bb0bf83f-561a-406f-8061-0ad6d1b4535b.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/03f18061-13fd-42bf-8b8d-ce82c6e44378.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/7c559f3c-f820-4757-9913-7c0a1a9aabc4.jpg',
      'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4e1925ad-dc5f-4493-b3a3-a84a65da04ef.jpg'
    ]
  }
];

const HotelCatalog = () => {
  const [hotels, setHotels] = useState(initialHotels);
  const [selectedLocation, setSelectedLocation] = useState('Все');
  const [priceRange, setPriceRange] = useState('Все');
  const [showAdmin, setShowAdmin] = useState(false);

  const locations = ['Все', 'Центр Москвы', 'Тверская улица', 'Москва-Сити', 'Патриаршие пруды', 'Кутузовский проспект', 'Замоскворечье', 'Остоженка', 'Рублёвское шоссе', 'Чистые пруды', 'Пресненская набережная', 'Сретенский бульвар', 'Маросейка', 'Воробьёвы горы', 'Поварская улица', 'Серебряный Бор', 'Большая Никитская', 'Золотые ключи', 'Крымский вал'];
  const priceRanges = [
    { label: 'Все', min: 0, max: Infinity },
    { label: 'До 45 000 ₽', min: 0, max: 45000 },
    { label: '45 000 - 55 000 ₽', min: 45000, max: 55000 },
    { label: '55 000 - 65 000 ₽', min: 55000, max: 65000 },
    { label: 'От 65 000 ₽', min: 65000, max: Infinity }
  ];

  const handleDeleteHotel = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const filteredHotels = hotels.filter(hotel => {
    const hotelPrice = parseInt(hotel.price.replace(/\s/g, ''));
    const selectedPriceRange = priceRanges.find(r => r.label === priceRange);
    
    const locationMatch = selectedLocation === 'Все' || hotel.location === selectedLocation;
    const priceMatch = !selectedPriceRange || (hotelPrice >= selectedPriceRange.min && hotelPrice <= selectedPriceRange.max);
    
    return locationMatch && priceMatch;
  });

  return (
    <section id="catalog" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-5xl font-light">Каталог премиум-отелей</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAdmin(true)}
              className="text-gray-400 hover:text-gold"
              title="Управление отелями"
            >
              <Icon name="Settings" size={24} />
            </Button>
          </div>
          <p className="text-gray-600 text-lg">Избранные отели Москвы для самых взыскательных гостей</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-5 mb-12">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={18} className="text-gold" />
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-200 focus:border-gold focus:outline-none text-sm min-w-[200px]"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <Icon name="Wallet" size={18} className="text-gold" />
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-200 focus:border-gold focus:outline-none text-sm min-w-[200px]"
              >
                {priceRanges.map(range => (
                  <option key={range.label} value={range.label}>{range.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <p className="text-sm text-gray-600">
                Найдено: <span className="font-semibold text-dark">{filteredHotels.length}</span>
              </p>
              {(selectedLocation !== 'Все' || priceRange !== 'Все') && (
                <button
                  onClick={() => {
                    setSelectedLocation('Все');
                    setPriceRange('Все');
                  }}
                  className="text-sm text-gold hover:text-dark transition-colors flex items-center gap-1"
                >
                  <Icon name="X" size={14} />
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {filteredHotels.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <Icon name="SearchX" size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">По выбранным фильтрам отели не найдены</p>
              <p className="text-sm text-gray-500 mt-2">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            filteredHotels.map((hotel, index) => (
            <Card key={hotel.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <div className="h-64 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{hotel.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <Icon name="MapPin" size={16} />
                  {hotel.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {hotel.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-gold" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                {hotel.gallery && hotel.gallery.length > 0 && (
                  <HotelGallery images={hotel.gallery} hotelName={hotel.name} />
                )}
                
                <div className="flex items-center justify-between pt-4 border-t mt-4">
                  <div>
                    <p className="text-sm text-gray-500">от</p>
                    <p className="text-2xl font-semibold">{hotel.price} ₽</p>
                    <p className="text-xs text-gray-500">за ночь</p>
                  </div>
                  <Button 
                    className="bg-gold hover:bg-gold/90 text-dark"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                          const messageInput = document.querySelector('textarea[placeholder*="сообщение"]') as HTMLTextAreaElement;
                          if (messageInput) {
                            messageInput.value = `Здравствуйте! Хочу забронировать отель "${hotel.name}".`;
                            messageInput.focus();
                          }
                        }, 500);
                      }
                    }}
                  >
                    Забронировать
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
      
      {showAdmin && (
        <AdminPanel
          hotels={hotels}
          onDelete={handleDeleteHotel}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </section>
  );
};

export default HotelCatalog;