create database todos;

use todos;

create table Todo(
	id int not null auto_increment primary key,
    title varchar(50),
    details varchar(255)
);