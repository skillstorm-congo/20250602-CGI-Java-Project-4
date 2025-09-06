##########################################################################
### PROJECT 4: EMPLOYEE TIMECARD TRACKING SYSTEM DATABASE DATA INPUT #####
##########################################################################

############################################################
# insert data(3 records) into manager table (table 1 of 6)
############################################################
insert into `project_4`.`manager` (id, first_name, last_name, title) values (1, 'Antons', 'Leroux', 'Chief Design Engineer');
insert into `project_4`.`manager` (id, first_name, last_name, title) values (2, 'Fannie', 'Speedy', 'Operation Manager');
insert into `project_4`.`manager` (id, first_name, last_name, title) values (3, 'Alic', 'Addyman', 'IT Manager');

############################################################
# insert data(10 records) into employee table (table 2 of 6)
############################################################
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (83,'Shane','Pauly','Automation Specialist I',44.36,1);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (73,'Sonja','Blakeborough','Software Test Engineer III',70.75,1);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (95,'Corby','Preskett','Analyst Programmer',35.69,1);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (34,'Clareta','Treeby','Programmer Analyst I',27.25,1);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (84,'Albert','Desouza','Statistician III',65.99,2);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (64,'Genevieve','Edmondson','Data Coordinator',39.45,2);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (72,'Robin','Dunnett','Operation Analyst I',32,2);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (65,'Antons','Leroux','Chief Design Engineer',90.5,3);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (42,'Fannie','Speedy','Operation Manager',81.92,3);
insert into `project_4`.`employee` (id, first_name, last_name, title, pay_rate_per_hour, manager_id) values (39,'Alic','Addyman','IT Manager',100,NULL);

################################################################################
# insert data(10 records) into user table (table 3 of 6)
# note the password field will be updated in Spring Boot with Password Encoder
################################################################################
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (63,83,"user1","password1","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (50,73,"user2","password2","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (71,95,"user3","password3","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (70,34,"user4","password4","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (84,84,"user5","password5","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (86,64,"user6","password6","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (92,72,"user7","password7","user",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (72,65,"user8","password8","admin",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (81,42,"user9","password9","admin",1);
insert into `project_4`.`user` (id, employee_id, username, password, role, active_status) values (29,39,"user10","password10","admin",1);

################################################################################
# insert data(10 records) into user table (table 3 of 6)
# note the password field will be updated in Spring Boot with Password Encoder
################################################################################
insert into `project_4`.`time_off` (id, employee_id, fiscal_week_fiscal_year, date_start, date_end, comment, approved, approved_date, submitted, submitted_date) 
values (46, 64, "312025", "2025-08-01", "2025-08-02", "Out of Town Vacation", 1, "2025-07-17", 1, "2025-07-07");

insert into `project_4`.`time_off` (id, employee_id, fiscal_week_fiscal_year, date_start, date_end, comment, approved, approved_date, submitted, submitted_date) 
values (22, 64, "322025", "2025-08-09", "2025-08-09", "", 1, "2025-07-17", 1, "2025-07-10");

insert into `project_4`.`time_off` (id, employee_id, fiscal_week_fiscal_year, date_start, date_end, comment, approved, approved_date, submitted, submitted_date) 
values (14, 95, "442025", "2025-10-30", "2025-10-31", "Vacation", NULL, NULL, 0, NULL);

insert into `project_4`.`time_off` (id, employee_id, fiscal_week_fiscal_year, date_start, date_end, comment, approved, approved_date, submitted, submitted_date)
values (16, 42, "382025", "2025-09-19", "2025-09-19", "Going to the Zoo", NULL, NULL, 1, "2025-09-04");

insert into `project_4`.`time_off` (id, employee_id, fiscal_week_fiscal_year, date_start, date_end, comment, approved, approved_date, submitted, submitted_date) 
values (17, 84, "452025", "2025-11-08", "2025-11-08", "", NULL, NULL, 0, NULL);