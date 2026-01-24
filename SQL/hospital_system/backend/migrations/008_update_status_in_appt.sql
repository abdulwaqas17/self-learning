ALTER TABLE appointments MODIFY COLUMN
status ENUM("Sheduled","Completed","Cancelled") NOT NULL DEFAULT "Sheduled";