-- Расширяем галереи отелей с разным количеством фото (от 5 до 8)

-- The Ritz-Carlton Moscow (8 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/732f911c-13af-4998-aaab-91ddf1b475fa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/71a0c863-e0eb-4de2-9fec-d82d714d43d9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/16c905ca-4599-49e8-89f0-30d8a2d233a9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f1841383-3698-4bdd-921c-d5fcb85280fe.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/fe92cf11-88e8-4828-823c-4e649fe5be19.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3fa2b4e6-b0fc-4d9b-96a6-1bc6fc6b7fea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5ae7fda4-e512-4c8f-914e-42d8cfe079c1.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a52fc8a0-cdaf-42ce-af66-192d61391516.jpg'
]
WHERE id = 19;

-- Four Seasons Hotel Moscow (7 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/15fac0f1-263e-4363-948c-759a55af6fe9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3685eeab-d651-443a-9586-ff996a284644.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6df61215-c0df-4142-a8ea-af1d8c39da51.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6dc2ee32-36bd-4e25-a353-a01b1b18dc68.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/592c1bae-267a-41bc-afda-3356e3c80b3b.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/236a09e9-4e6e-4860-8308-6b192eaae64a.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4a2b6dcd-85ef-47ac-8a77-5ea34cc1822e.jpg'
]
WHERE id = 20;

-- The St. Regis Moscow Nikolskaya (6 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/b4d7d2bc-987e-42bb-8dcb-e5f7cbf8c2ba.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/732f911c-13af-4998-aaab-91ddf1b475fa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c77083ac-8cf5-4d86-a912-9232ec5134aa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/16c905ca-4599-49e8-89f0-30d8a2d233a9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6a957929-c0c8-46c2-8789-c61f522bc8a0.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/fe92cf11-88e8-4828-823c-4e649fe5be19.jpg'
]
WHERE id = 21;

-- Ararat Park Hyatt Moscow (8 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/e47a7ce6-53c4-416c-9fb7-9c754719f864.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/71a0c863-e0eb-4de2-9fec-d82d714d43d9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/75d3f0a7-0b6f-4721-8345-2253a2e08bea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f1841383-3698-4bdd-921c-d5fcb85280fe.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3fa2b4e6-b0fc-4d9b-96a6-1bc6fc6b7fea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/592c1bae-267a-41bc-afda-3356e3c80b3b.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5ae7fda4-e512-4c8f-914e-42d8cfe079c1.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a52fc8a0-cdaf-42ce-af66-192d61391516.jpg'
]
WHERE id = 22;

-- Swissôtel Krasnye Holmy (5 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6dc2ee32-36bd-4e25-a353-a01b1b18dc68.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3685eeab-d651-443a-9586-ff996a284644.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/16c905ca-4599-49e8-89f0-30d8a2d233a9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c77083ac-8cf5-4d86-a912-9232ec5134aa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/236a09e9-4e6e-4860-8308-6b192eaae64a.jpg'
]
WHERE id = 23;

-- Hotel Metropol Moscow (7 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/15fac0f1-263e-4363-948c-759a55af6fe9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/732f911c-13af-4998-aaab-91ddf1b475fa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/b4d7d2bc-987e-42bb-8dcb-e5f7cbf8c2ba.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6df61215-c0df-4142-a8ea-af1d8c39da51.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4a2b6dcd-85ef-47ac-8a77-5ea34cc1822e.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6a957929-c0c8-46c2-8789-c61f522bc8a0.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/fe92cf11-88e8-4828-823c-4e649fe5be19.jpg'
]
WHERE id = 24;

-- Bulgari Hotel Moscow (6 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/75d3f0a7-0b6f-4721-8345-2253a2e08bea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/71a0c863-e0eb-4de2-9fec-d82d714d43d9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f1841383-3698-4bdd-921c-d5fcb85280fe.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/16c905ca-4599-49e8-89f0-30d8a2d233a9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5ae7fda4-e512-4c8f-914e-42d8cfe079c1.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/236a09e9-4e6e-4860-8308-6b192eaae64a.jpg'
]
WHERE id = 25;

-- Mandarin Oriental, Moscow (8 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3685eeab-d651-443a-9586-ff996a284644.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/e47a7ce6-53c4-416c-9fb7-9c754719f864.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6dc2ee32-36bd-4e25-a353-a01b1b18dc68.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c77083ac-8cf5-4d86-a912-9232ec5134aa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a52fc8a0-cdaf-42ce-af66-192d61391516.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4a2b6dcd-85ef-47ac-8a77-5ea34cc1822e.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6a957929-c0c8-46c2-8789-c61f522bc8a0.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/592c1bae-267a-41bc-afda-3356e3c80b3b.jpg'
]
WHERE id = 26;

-- Bagration Hotel & SPA (5 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/16c905ca-4599-49e8-89f0-30d8a2d233a9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/c77083ac-8cf5-4d86-a912-9232ec5134aa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/732f911c-13af-4998-aaab-91ddf1b475fa.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6df61215-c0df-4142-a8ea-af1d8c39da51.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/fe92cf11-88e8-4828-823c-4e649fe5be19.jpg'
]
WHERE id = 27;

-- Golden Ring Hotel (7 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/b4d7d2bc-987e-42bb-8dcb-e5f7cbf8c2ba.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/15fac0f1-263e-4363-948c-759a55af6fe9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/71a0c863-e0eb-4de2-9fec-d82d714d43d9.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/f1841383-3698-4bdd-921c-d5fcb85280fe.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3fa2b4e6-b0fc-4d9b-96a6-1bc6fc6b7fea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/5ae7fda4-e512-4c8f-914e-42d8cfe079c1.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/236a09e9-4e6e-4860-8308-6b192eaae64a.jpg'
]
WHERE id = 28;

-- The Savoy Moscow (6 фото)
UPDATE t_p19515115_premium_hotel_landin.hotels 
SET gallery = ARRAY[
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/6dc2ee32-36bd-4e25-a353-a01b1b18dc68.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/75d3f0a7-0b6f-4721-8345-2253a2e08bea.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/3685eeab-d651-443a-9586-ff996a284644.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/e47a7ce6-53c4-416c-9fb7-9c754719f864.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/a52fc8a0-cdaf-42ce-af66-192d61391516.jpg',
  'https://cdn.poehali.dev/projects/a80e62eb-d0ff-446f-a459-c9ea48d4127d/files/4a2b6dcd-85ef-47ac-8a77-5ea34cc1822e.jpg'
]
WHERE id = 29;