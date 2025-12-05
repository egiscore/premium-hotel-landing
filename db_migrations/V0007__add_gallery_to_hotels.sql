-- Добавляем поле gallery в таблицу hotels для хранения массива URL фотографий
ALTER TABLE hotels ADD COLUMN gallery TEXT[] DEFAULT ARRAY[]::TEXT[];