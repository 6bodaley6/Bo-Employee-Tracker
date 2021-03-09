drop database if exists employees_db;
create database employees_db;
use employees_db;
-- creates departments table
create table department (
    id int(6) auto_increment primary key,
    name varchar(30) unique not null 
);
create table role (
    id int(6) auto_increment primary key,    
    title varchar(30) not null,
    salary decimal not null,
    department_id int(6) not null,
    constraint fk_department foreign key (department_id) references department(id) on delete cascade
);
create table employee (
    id int(6) auto_increment primary key,
    first_name varchar(30) not null, 
    last_name varchar(120) not null,
    role_id int(6)  not null,
    constraint fk_role foreign key (role_id) references role(id) on delete cascade, 
    manager_id int(6),
    constraint fk_manager foreign key (manager_id) references employee(id) on delete set null 
)




