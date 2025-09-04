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
  `manager_id` INT NULL,
  `fiscal_week_fiscal_year` VARCHAR(100) NULL,
  `date_start` DATETIME NULL,
  `date_end` DATETIME NULL,
  `comment` VARCHAR(45) NULL,
  `approved` BOOLEAN NULL,
  `approved_date` DATETIME NULL,
  `submitted` BOOLEAN NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id_2_idx` (`employee_id` ASC) VISIBLE,
  INDEX `manager_id_2_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_2`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `manager_id_2`
    FOREIGN KEY (`manager_id`)
    REFERENCES `project_4`.`manager` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
);


# create time sheet table
CREATE TABLE `project_4`.`time_sheet` 
(
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `manager_id` INT NOT NULL,
  `fiscal_week_fiscal_year` VARCHAR(100) NOT NULL,
  `date_start` DATETIME NOT NULL,
  `date_end` DATETIME NOT NULL,
  `submitted` TINYINT NULL,
  `approved` TINYINT NULL,
  `approved_date` DATETIME NULL,
  `comment` VARCHAR(200) NULL,
  `time_off_id` INT NULL,
  
  `regular_hours_day_1` DECIMAL(10,2) NULL,
  `regular_hours_day_2` DECIMAL(10,2) NULL,
  `regular_hours_day_3` DECIMAL(10,2) NULL,
  `regular_hours_day_4` DECIMAL(10,2) NULL,
  `regular_hours_day_5` DECIMAL(10,2) NULL,
  `regular_hours_day_6` DECIMAL(10,2) NULL,
  `regular_hours_day_7` DECIMAL(10,2) NULL,
  `total_regular_hours` DECIMAL(10, 2) NULL,
  
  `overtime_hours_day_1` DECIMAL(10,2) NULL,
  `overtime_hours_day_2` DECIMAL(10,2) NULL,
  `overtime_hours_day_3` DECIMAL(10,2) NULL,
  `overtime_hours_day_4` DECIMAL(10,2) NULL,
  `overtime_hours_day_5` DECIMAL(10,2) NULL,
  `overtime_hours_day_6` DECIMAL(10,2) NULL,
  `overtime_hours_day_7` DECIMAL(10,2) NULL,
  `total_overtime_hours` DECIMAL(10,2) NULL,
  
  `time_off_hours_day_1` DECIMAL(10,2) NULL,
  `time_off_hours_day_2` DECIMAL(10,2) NULL,
  `time_off_hours_day_3` DECIMAL(10,2) NULL,
  `time_off_hours_day_4` DECIMAL(10,2) NULL,
  `time_off_hours_day_5` DECIMAL(10,2) NULL,
  `time_off_hours_day_6` DECIMAL(10,2) NULL,
  `time_off_hours_day_7` DECIMAL(10,2) NULL,
  `total_time_off_hours` DECIMAL(10,2) NULL,
  
  PRIMARY KEY (`id`),
  INDEX `employee_id_3_idx` (`employee_id` ASC) VISIBLE,
  INDEX `manager_id_3_idx` (`manager_id` ASC) VISIBLE,
  INDEX `time_off_id_1_idx` (`time_off_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_3`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `manager_id_3`
    FOREIGN KEY (`manager_id`)
    REFERENCES `project_4`.`manager` (`id`)
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
  `fiscal_week_fiscal_year_start` VARCHAR(100) NULL,
  `fiscal_week_fiscal_year_end` VARCHAR(100) NULL,
  `date_start` DATETIME NULL,
  `date_end` DATETIME NULL,
  `pay_rate_per_hour` DECIMAL(10,2) NULL,
  `pay_stub_date` DATETIME NULL,
  `ts1_total_regular_hours` DECIMAL(10,2) NULL,
  `ts1_total_overtime_hours` DECIMAL(10,2) NULL,
  `ts1_total_time_off_hours` DECIMAL(10,2) NULL,
  `ts2_total_regular_hours` DECIMAL(10,2) NULL,
  `ts2_total_overtime_hours` DECIMAL(10,2) NULL,
  `ts2_total_time_off_hours` DECIMAL(10,2) NULL,
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
