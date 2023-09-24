USE employee_tracker;
INSERT INTO department(dept_name) VALUES ("HR"), ("ADMIN");
INSERT INTO role(title, salary, department_id) VALUES ("HR manager", 50000, 1), ("Administrator", 45000, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("JEFF", "SATURDAY", 1, NULL), ("Alex", "Smith", 2, 1);
