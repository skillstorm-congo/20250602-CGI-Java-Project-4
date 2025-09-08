/*
PROJECT 4: EMPLOYEE TIMECARD TRACKING SYSTEM DATABASE

TABLES
-- employee
-- manager
-- user
-- time sheet
-- time off
-- pay stub

RELATIONSHIPS
Table A		Table B	   		Relationship
Employee	Manager			1 to 1
Manager		Employee		1 to many
Employee	User			1 to 1
Employee	Time Sheet		1 to many
Time Sheet	Employee		1 to 1
Employee	Time Off		1 to many
Time Off 	Employee 		1 to 1
Employee 	Pay Stub		1 to many
Pay Stub	Employee		1 to 1
*/

# create database
CREATE SCHEMA `project_4`;

# create manager table
CREATE TABLE `project_4`.`manager` 
(
  `id` INT NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  PRIMARY KEY (`id`)
);

# create employee table
CREATE TABLE `project_4`.`employee` 
(
  `id` INT NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  `pay_rate_per_hour` DECIMAL(10,2) NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `manager_id_1_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `manager_id_1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `project_4`.`manager` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

# create user table
CREATE TABLE `project_4`.`user` 
(
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `active_status` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id_1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

# create time off table
CREATE TABLE `project_4`.`time_off` 
(
  `id` INT NOT NULL,
  `employee_id` INT NULL,
  `fiscal_week_fiscal_year` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `date_start` DATE NULL,
  `date_end` DATE NULL,
  `comment` VARCHAR(45) NULL,
  `approved` BOOLEAN NULL,
  `approved_date` DATE NULL,
  `submitted` BOOLEAN NULL,
  `submitted_date` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id_2_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


# create time sheet table
CREATE TABLE `project_4`.`time_sheet` 
(
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `fiscal_week_fiscal_year` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `date_start` DATE NOT NULL,
  `date_end` DATE NOT NULL,
  `submitted` BOOLEAN NULL,
  `submitted_date` DATE NULL,
  `approved` BOOLEAN NULL,
  `approved_date` DATE NULL,
  `comment` VARCHAR(200) NULL,
  `time_off_id` INT NULL,
  
  `regular_hours_day_1` DECIMAL(10,2) NULL,
  `regular_hours_day_2` DECIMAL(10,2) NULL,
  `regular_hours_day_3` DECIMAL(10,2) NULL,
  `regular_hours_day_4` DECIMAL(10,2) NULL,
  `regular_hours_day_5` DECIMAL(10,2) NULL,
  `total_regular_hours` DECIMAL(10, 2) GENERATED ALWAYS AS ( IFNULL(`regular_hours_day_1`, 0) + IFNULL(`regular_hours_day_2`, 0) + IFNULL(`regular_hours_day_3`, 0) + IFNULL(`regular_hours_day_4`, 0) + IFNULL(`regular_hours_day_5`, 0) ) VIRTUAL,
  
  `overtime_hours_day_1` DECIMAL(10,2) NULL,
  `overtime_hours_day_2` DECIMAL(10,2) NULL,
  `overtime_hours_day_3` DECIMAL(10,2) NULL,
  `overtime_hours_day_4` DECIMAL(10,2) NULL,
  `overtime_hours_day_5` DECIMAL(10,2) NULL,
  `total_overtime_hours` DECIMAL(10,2) GENERATED ALWAYS AS ( IFNULL(`overtime_hours_day_1`, 0) + IFNULL(`overtime_hours_day_2`, 0) + IFNULL(`overtime_hours_day_3`, 0)  + IFNULL(`overtime_hours_day_4`,0)  + IFNULL(`overtime_hours_day_5`, 0) ) VIRTUAL,
  
  `time_off_hours_day_1` DECIMAL(10,2) NULL,
  `time_off_hours_day_2` DECIMAL(10,2) NULL,
  `time_off_hours_day_3` DECIMAL(10,2) NULL,
  `time_off_hours_day_4` DECIMAL(10,2) NULL,
  `time_off_hours_day_5` DECIMAL(10,2) NULL,
  `total_time_off_hours` DECIMAL(10,2) GENERATED ALWAYS AS ( IFNULL(`time_off_hours_day_1`,0) + IFNULL(`time_off_hours_day_2`,0) + IFNULL(`time_off_hours_day_3`,0) + IFNULL(`time_off_hours_day_4`,0) + IFNULL(`time_off_hours_day_5`,0) ) VIRTUAL,
  
  PRIMARY KEY (`id`),
  INDEX `employee_id_3_idx` (`employee_id` ASC) VISIBLE,
  INDEX `time_off_id_1_idx` (`time_off_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_3`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `time_off_id_1`
    FOREIGN KEY (`time_off_id`)
    REFERENCES `project_4`.`time_off` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


# create pay stub table
CREATE TABLE `project_4`.`pay_stub` 
(
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `time_sheet_id_1` INT NOT NULL,
  `time_sheet_id_2` INT NULL,
  `time_off_id_1` INT NULL,
  `time_off_id_2` INT NULL,
  `fiscal_week_fiscal_year_start` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `fiscal_week_fiscal_year_end` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_end`, 3)),
  `date_start` DATE NULL,
  `date_end` DATE NULL,
  `pay_stub_date` DATE NULL,
  `total_regular_hours` DECIMAL(10,2) NULL,
  `total_overtime_hours` DECIMAL(10,2) NULL,
  `total_time_off_hours` DECIMAL(10,2) NULL,
  `total_paid` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id_4_idx` (`employee_id` ASC) VISIBLE,
  INDEX `time_sheet_1_idx` (`time_sheet_id_1` ASC) VISIBLE,
  INDEX `time_sheet_2_idx` (`time_sheet_id_2` ASC) VISIBLE,
  INDEX `time_off_id_2_idx` (`time_off_id_1` ASC) VISIBLE,
  INDEX `time_off_id_3_idx` (`time_off_id_2` ASC) VISIBLE,
  CONSTRAINT `employee_id_4`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `time_sheet_id_1`
    FOREIGN KEY (`time_sheet_id_1`)
    REFERENCES `project_4`.`time_sheet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `time_sheet_id_2`
    FOREIGN KEY (`time_sheet_id_2`)
    REFERENCES `project_4`.`time_sheet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `time_off_id_2`
    FOREIGN KEY (`time_off_id_1`)
    REFERENCES `project_4`.`time_off` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `time_off_id_3`
    FOREIGN KEY (`time_off_id_2`)
    REFERENCES `project_4`.`time_off` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);

# Trigger 1: 
DROP TRIGGER IF EXISTS `project_4`.`pay_stub_BEFORE_INSERT`;

DELIMITER $$
USE `project_4`$$
CREATE DEFINER = CURRENT_USER TRIGGER `project_4`.`pay_stub_BEFORE_INSERT` 
BEFORE INSERT ON `pay_stub` FOR EACH ROW
BEGIN
    
	SET NEW.`total_regular_hours` = 
		(
			SELECT sum(a.`total_regular_hours`)
			FROM `project_4`.`time_sheet` AS a
			WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
		);
		
	SET NEW.`total_overtime_hours`  = 
		(
			SELECT sum(a.`total_overtime_hours`)
			FROM `project_4`.`time_sheet` AS a
			WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
		);
		
	SET NEW.`total_time_off_hours` = 
		(
			SELECT sum(a.`total_time_off_hours`)
			FROM `project_4`.`time_sheet`AS a
			WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
		);
		
	SET NEW.`total_paid` = ( (NEW.`total_regular_hours` +  NEW.`total_time_off_hours`)*(SELECT pay_rate_per_hour
																			FROM `project_4`.`employee` AS a
																			WHERE a.id = NEW.`employee_id`) 
									+ ( (NEW.`total_overtime_hours` )*(1.5*(SELECT pay_rate_per_hour
																			FROM `project_4`.`employee` AS a
																			WHERE a.id = NEW.`employee_id`) 
																	   ) 
									  ) 
								);
		
END
$$
DELIMITER ;

# Trigger 2: 
DROP TRIGGER IF EXISTS `project_4`.`pay_stub_BEFORE_UPDATE`;

DELIMITER $$
USE `project_4`$$
CREATE DEFINER = CURRENT_USER TRIGGER `project_4`.`pay_stub_BEFORE_UPDATE` 
BEFORE UPDATE ON `pay_stub` FOR EACH ROW
BEGIN

	# if pay_stub_date is NULL then it hasn't been finalized/paid out
	IF (NEW.`pay_stub_date`IS NULL) THEN

		SET NEW.`total_regular_hours` = 
			(
				SELECT sum(a.`total_regular_hours`)
				FROM `project_4`.`time_sheet` AS a
				WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
			);
			
		SET NEW.`total_overtime_hours`  = 
			(
				SELECT sum(a.`total_overtime_hours`)
				FROM `project_4`.`time_sheet` AS a
				WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
			);
			
		SET NEW.`total_time_off_hours` = 
			(
				SELECT sum(a.`total_time_off_hours`)
				FROM `project_4`.`time_sheet`AS a
				WHERE a.id = NEW.`time_sheet_id_1` OR a.id = NEW.`time_sheet_id_2`
			);
			
		SET NEW.`total_paid` = ( (NEW.`total_regular_hours` +  NEW.`total_time_off_hours`)*(SELECT pay_rate_per_hour
																				FROM `project_4`.`employee` AS a
																				WHERE a.id = NEW.`employee_id`) 
										+ ( (NEW.`total_overtime_hours` )*(1.5*(SELECT pay_rate_per_hour
																				FROM `project_4`.`employee` AS a
																				WHERE a.id = NEW.`employee_id`) 
																		   ) 
										  ) 
									);
	END IF;
END
$$
DELIMITER ;

/*
Before a time card can be a pay stub their 'approve' property MUST be TRUE (1) and the manger MUST CREATE a pay stub by inserting 2 time sheet ids.
An APPROVED time sheet CAN be updated but a pay stub CAN only be UPDATED if its pays stub date is NULL. 

If a pay stub date is NOT NULL then that indicates that the pay stub has been PAID OUT.
*/

# Trigger 3: 
DROP TRIGGER IF EXISTS `project_4`.`time_sheet_AFTER_UPDATE`;

DELIMITER $$
USE `project_4`$$
CREATE DEFINER = CURRENT_USER TRIGGER `project_4`.`time_sheet_AFTER_UPDATE` 
AFTER UPDATE ON `time_sheet` FOR EACH ROW
BEGIN
	IF NEW.`approved` = 1 THEN
    
		# if pay_stub_date is NULL then it hasn't been finalized/paid out
        IF (SELECT `pay_stub`.`pay_stub_date`
			FROM `project_4`.`pay_stub`
			WHERE `pay_stub`.`time_sheet_id_1` = NEW.`id` or `pay_stub`.`time_sheet_id_2` = NEW.`id`) IS NULL THEN
            
			UPDATE `pay_stub`
			SET `total_regular_hours` = 
				(
					SELECT sum(a.`total_regular_hours`)
					FROM `project_4`.`time_sheet` AS a
					WHERE a.id = `time_sheet_id_1` OR a.id = `time_sheet_id_2`
				),
				
			`total_overtime_hours`  = 
				(
					SELECT sum(a.`total_overtime_hours`)
					FROM `project_4`.`time_sheet` AS a
					WHERE a.id = `time_sheet_id_1` OR a.id = `time_sheet_id_2`
				),
				
			`total_time_off_hours` = 
				(
					SELECT sum(a.`total_time_off_hours`)
					FROM `project_4`.`time_sheet`AS a
					WHERE a.id = `time_sheet_id_1` OR a.id = `time_sheet_id_2`
				),
				
			`total_paid` = ( (`total_regular_hours` +  `total_time_off_hours`)*(SELECT pay_rate_per_hour
																					FROM `project_4`.`employee` AS a
																					WHERE a.id = `employee_id`) 
											+ ( (`total_overtime_hours` )*(1.5*(SELECT pay_rate_per_hour
																					FROM `project_4`.`employee` AS a
																					WHERE a.id = `employee_id`) 
																			   ) 
											  ) 
										)
                                        
			WHERE `pay_stub`.`time_sheet_id_1` = NEW.`id` or `pay_stub`.`time_sheet_id_2` = NEW.`id`;
		END IF;
        
    END IF;
    
END
$$
DELIMITER ;

