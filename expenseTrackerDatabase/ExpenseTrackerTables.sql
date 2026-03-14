create database expensetracker;
use expensetracker;

create table users (
id bigint auto_increment primary key,
name varchar(255) not null,
email varchar(255) unique not null,
password varchar(255) not null
);
INSERT INTO USERS (NAME,EMAIL,PASSWORD) VALUES ('DEFAULT','DEFAULT','DEFAULT');

create table custom_expense_types (
id bigint auto_increment primary key,
name varchar(255),
email varchar(255),
foreign key (email) references users(email)
);

INSERT INTO custom_expense_types (name, email) VALUES
('Food', DEFAULT),
('Rent', DEFAULT),
('Transport', DEFAULT),
('Shopping', DEFAULT),
('Entertainment', DEFAULT),
('Health', DEFAULT),
('Utilities', DEFAULT);


create table expenses(
id bigint auto_increment primary key,
title varchar(255) not null,
type_id bigint not null,
amount decimal(10,2) not null,
email varchar(255) not null,
created_date date not null,
foreign key (type_id) references custom_expense_types(id),
foreign key (email) references users(email)
);
