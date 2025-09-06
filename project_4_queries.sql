####################################################################
### Sanity Checks Post Table Record Insertion ######################
####################################################################

select * from `project_4`.`manager`;

select * from `project_4`.`employee`;

select * from `project_4`.`user`;

select * from `project_4`.`time_off`;

select YEARWEEK(DATE('2025-08-01'), 3);

select * from `project_4`.`time_sheet`;

 SELECT YEARWEEK('2025-09-06', 3);
 
 SELECT `total_time_off_hours`
FROM `project_4`.`time_sheet`
WHERE id = 97; and id = 62;

SELECT `total_time_off_hours`
FROM `project_4`.`time_sheet`
WHERE id = 62;

SELECT id, total_time_off_hours
FROM `project_4`.`time_sheet`
WHERE id = 97 or id = 62;

SELECT sum(total_time_off_hours)
FROM `project_4`.`time_sheet`
WHERE id = 97 or id = 62;

SELECT a.id, pay_rate_per_hour
FROM `project_4`.`employee` AS a
INNER JOIN `project_4`.`pay_stub` AS b
on a.id = b.employee_id 
where b.employee_id = 95;

select * from `project_4`.`pay_stub` ;
