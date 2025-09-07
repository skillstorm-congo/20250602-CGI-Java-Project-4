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
## TESTING TRIGGER #2 | TESTING BEFORE UPDATE TRIGGER ON PAY STUB TABLE
############################################################################
# update a record in pay stub table & check if the triggered columns output the expected output (should be no change to calculated outputs)
UPDATE `project_4`.`pay_stub`
SET `date_start` = current_date()
WHERE id = 99;

select * from `project_4`.`pay_stub` where id = 99 ;

#reset back to original date
UPDATE `project_4`.`pay_stub`
SET `date_start` = '2025-08-11'
WHERE id = 99;

select * from `project_4`.`pay_stub` where id = 99 ;


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
# these are the records are used to test | time sheet is approved and pay stub date is NULL so pay stub table will UPDATE
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

# update time sheet id 60 with over time hours (1), pay stub should NOT update b/c TS is Approved & pay stub date is NOT NULL
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 1
WHERE `time_sheet`.`id` = 60;

select * from `project_4`.`time_sheet` where id = 60;

select * from `project_4`.`pay_stub` where time_sheet_id_1 = 60 or time_sheet_id_2 = 60 ;

# reset back to 0
UPDATE `project_4`.`time_sheet` 
SET `time_sheet`.`overtime_hours_day_3` = 0
WHERE `time_sheet`.`id` = 60;
