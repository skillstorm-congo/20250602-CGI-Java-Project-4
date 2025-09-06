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

select * from `project_4`.`pay_stub` ;

select total_regular_hours from `project_4`.`time_sheet` ;

SELECT * FROM `project_4`.`time_sheet` WHERE employee_id = 95 ;

SELECT sum(a.`total_regular_hours`), sum(a.`total_overtime_hours`), sum(a.`total_time_off_hours`)
FROM `project_4`.`time_sheet` AS a
INNER JOIN `project_4`.`pay_stub` AS b
ON a.id = b.time_sheet_id_1
OR a.id = b.time_sheet_id_2
WHERE a.id = 86 OR a.id = 197 ;
WHERE a.id = new.`time_sheet_id_1` OR a.id = new.`time_sheet_id_2`

##########################################
## TESTING BEFORE UPDATE TRIGGER
##########################################
-- update a record in pay stub table
UPDATE `project_4`.`pay_stub`
SET `time_off_id_1` = 46, `time_off_id_2` = 22
WHERE id = 12;


