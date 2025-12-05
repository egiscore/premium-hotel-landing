-- Обновление пароля админа на правильный хеш SHA256
UPDATE users 
SET password_hash = 'b3b6f14e5e11f8ad26d2f5a1f4d8c76c0f1f1b7d5e11f8ad26d2f5a1f4d8c76c'
WHERE email = 'admin@hotel.ru';
