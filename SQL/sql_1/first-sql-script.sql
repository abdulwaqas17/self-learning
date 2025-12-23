create database firstsqldb;
use firstsqldb;
create table users (
id int auto_increment primary key,
name varchar(100) not null,
email varchar(100) unique not null,
gender enum('Male','Female','Other'),
age INT CHECK (age >= 18),
dob date,
created_at timestamp default current_timestamp
);
select * from users;