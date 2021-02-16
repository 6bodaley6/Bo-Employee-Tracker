use employees_db;
insert into department(name) values ("hr"), ("programming");
insert into role(title, salary, department_id) values ("front end Developer", 300000, 2), ("hr", 300000, 1);
insert into employee(first_name, last_name, role_id, manager_id) values ("Juan", "Pablo", 2, null), ("Betty", "White", 1, 1) ;
