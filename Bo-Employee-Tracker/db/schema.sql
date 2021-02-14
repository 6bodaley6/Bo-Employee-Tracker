drop database if exists employees;
create database employees_db;
use employees_db;
--creates departments table
create table department(
    id int auto_increment primary key,
    name varchar(30) unique not null 
);
create table role(
    id int auto_increment primary key,    
    title varchar(30),
    salary decimal,
    department_id int,
    constraint fk_department foreign key (department_id) references department(id) on delete cascade
)
create table employee(
    id int auto_increment primary key,
    first_name varchar(30), 
    last_name varchar(120),
    role_id int auto_increment primary key,
    constraint fk_role foreign key (role_id) references role(id) on delete cascade 
    manager_id int auto_increment primary key,
    constraint fk_manager foreign key (manager_id) references employee(id) on delete set null 
)



