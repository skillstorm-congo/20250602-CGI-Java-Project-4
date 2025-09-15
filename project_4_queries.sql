####################################################################
### Sanity Checks Post Table Record Insertion ######################
####################################################################
select * from `project_4`.`manager`;

select * from `project_4`.`employee`;

select * from `project_4`.`user`;

select * from `project_4`.`time_off`;

select * from `project_4`.`time_sheet`;

select * from `project_4`.`pay_stub` ;

######################################################################
## TESTING TIME SHEET GENERATED COLUMNS
-- see excel Employee Timecard Tracking System, tab = TimeSheetCheck
-- export table and review calculations
######################################################################
select * from `project_4`.`time_sheet`;

######################################################################################
## TESTING TRIGGER #1 | TESTING BEFORE INSERT TRIGGER ON PAY STUB TABLE
-- see excel Employee Timecard Tracking System, tab = Trigger BEFORE INSERT PAY STUB
######################################################################################

############################################################################
/* TESTING TRIGGER #2 | TESTING BEFORE UPDATE TRIGGER ON PAY STUB TABLE

3 Situations to Test:
1. Update a field in a pay stub record that does not effect calculated columns, expect no changes to calculated columns
2. Update a field in a pay stub record that does effect calculated columns and pay stub date is NOT NULL, expect no changes to calculated columns
3. Update a field in a pay stub record that does effect calculated columns and pay stub date is NULL, expect changes to calculated columns
*/
############################################################################
# Test 1: update a field in pay stub record & check if the triggered columns output the expected output (expected no change to calculated outputs)
UPDATE `project_4`.`pay_stub`
SET `date_start` = current_date()
WHERE id = 99;

select * from `project_4`.`pay_stub` where id = 99 ;

#reset back to original date
UPDATE `project_4`.`pay_stub`
SET `date_start` = '2025-08-11'
WHERE id = 99;

select * from `project_4`.`pay_stub` where id = 99 ;

#Test 2: Update a time sheet id and pay stub date is NOT NULL so new calculations ARE NOT suppose to take place
select * from `project_4`.`time_sheet` where employee_id = 64; #see what other time sheet ids are avaiable to assign to a pay stub record
select * from `project_4`.`pay_stub` where employee_id = 64 ; #Note: for id = 12 & total paid  = 3156.00

#updating time sheet id 2 to time sheet id 108 (basic 40 hour week), time sheet id = 22 is special b/c it takes into account of a time off request
UPDATE `project_4`.`pay_stub`
SET `time_sheet_id_2` = 108
WHERE id = 12;

#Note: for id = 12, total paid = 3156.00, no changes to calcuation (this is the correct anticipated action)
# but time_sheet_id_2 field was updatd to 108, this will not be allowed in spring boot as we will code 
#"if pay stub date is not null, no updates are allowed"
select * from `project_4`.`pay_stub` where employee_id = 64 ; 

#reset time_sheet_id_2 back to its orginal value
UPDATE `project_4`.`pay_stub`
SET `time_sheet_id_2` = 197
WHERE id = 12;

select * from `project_4`.`pay_stub` where employee_id = 64 ; 

#Test 3: Update a time_sheet_id_2 and pay stub is NOT APPROVED so new calculations take place
#see what pay stubs date are null, Note: for id = 95, total paid = 6553.60
select * from `project_4`.`pay_stub` where pay_stub_date is null; 

#look at all time sheets for employ ie 42
select * from `project_4`.`time_sheet` where employee_id = 42;

#check employ 42 pay rate = 81.92
select * from `project_4`.`employee` where id = 42;

#Update time_sheet_id_2 = 18 (FW35 - basic 40 hr week w/1 Overtime Hour)
UPDATE `project_4`.`pay_stub`
SET `time_sheet_id_2` = 18
WHERE id = 95;

#Note: for id = 95, total paid = 6676.48, expected (6553.60 + (1.5*81.92) = 6676.48)
#time_sheet_id_2 has been set to 18 (this is the correct anticipated action)
select * from `project_4`.`pay_stub` where employee_id = 42; 

#reset time_sheet_id_2 back to its original value
UPDATE `project_4`.`pay_stub`
SET `time_sheet_id_2` = 93
WHERE id = 95;

select * from `project_4`.`pay_stub` where employee_id = 42; 

###################################################################################################
/* TESTING TRIGGER #3

TESTING AFTER UPDATE TRIGGER | AFTER RECORD UPDATE IN TIME SHEET TABLE, PAY STUB TABLE WILL BE UPDATED

Before a time card can be a pay stub their 'approve' property MUST be TRUE (1) and the manger MUST CREATE a pay stub by inserting 2 time sheet ids.
An APPROVED time sheet CAN be updated but a pay stub CAN only be UPDATED if its pays stub date is NULL. 

If a pay stub date is NOT NULL then that indicates that the pay stub has been PAID OUT.

   2 Situations to TEST:
   1: Updated Record in Time Sheet, Record Time Sheet Approved is 1 (True) and its associated Pay Stub Record Pay Stub Date is NULL then the Pay Stub Record will be UPDATED
   2: Updated Record in Time Sheet, Record Time Sheet Approved is 1 (True) and its associated Pay Stub Record Pay Stub Date is NOT NULL then the Pay Stub Record will be NOT BE UPDATED
*/
####################################################################################################
#Test 1: these are the records are used to test | time sheet is approved and pay stub date is NULL so pay stub table will UPDATE
select ts.id as ts_id, ps.id as ps_id, ps.pay_stub_date, ts.approved
from `project_4`.`time_sheet` as ts
inner join `project_4`.`pay_stub` as ps
on ts.id = ps.time_sheet_id_1 or ts.id = ps.time_sheet_id_2
where ps.pay_stub_date is null;

# update time sheet id 103 with over time hours (1), pay stub should update, output is as expected in both time sheet and pay stub table
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 1
WHERE `time_sheet`.`id` = 103;

select * from `project_4`.`time_sheet` where id = 103;

select * from `project_4`.`pay_stub` where time_sheet_id_1 = 103 or time_sheet_id_2 = 103 ;

# reset back to 0
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 0
WHERE `time_sheet`.`id` = 103;

# these are the records are used to test | time sheet is approved and pay stub date is NOT NULL so NO CHANGE in pay stub table
select ts.id as ts_id, ps.id as ps_id, ps.pay_stub_date, ts.approved
from `project_4`.`time_sheet` as ts
inner join `project_4`.`pay_stub` as ps
on ts.id = ps.time_sheet_id_1 or ts.id = ps.time_sheet_id_2
where ps.pay_stub_date is not null;

#Test 2: update time sheet id 60 with over time hours (1), pay stub should NOT update b/c TS is Approved & pay stub date is NOT NULL
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 1
WHERE `time_sheet`.`id` = 60;

select * from `project_4`.`time_sheet` where id = 60;

select * from `project_4`.`pay_stub` where time_sheet_id_1 = 60 or time_sheet_id_2 = 60 ;

# reset back to 0
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 0
WHERE `time_sheet`.`id` = 60;

## Pay Stub Repository SQL #####
SELECT * FROM `project_4`.`pay_stub` WHERE employee_id in (select id from `project_4`.`employee` where manager_id = 3 );

select id from `project_4`.`employee` where manager_id = 2 ;

## Time Off Repository SQL #####
SELECT * FROM `project_4`.`time_off` WHERE employee_id in (select id from `project_4`.`employee` where manager_id = 3 );

