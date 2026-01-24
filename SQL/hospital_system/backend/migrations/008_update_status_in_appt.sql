-- ALTER TABLE appointments MODIFY COLUMN
-- status ENUM("Sheduled","Completed","Cancelled") NOT NULL DEFAULT "Sheduled";
ALTER TABLE users RENAME COLUMN name TO full_name;
