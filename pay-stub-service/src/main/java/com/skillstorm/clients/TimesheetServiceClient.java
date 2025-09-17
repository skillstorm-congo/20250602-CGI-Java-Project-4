package com.skillstorm.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import com.skillstorm.models.Timesheet;

@FeignClient(name = "timesheet-service")
public interface TimesheetServiceClient 
{
	
	//find all time sheet records by employee id
	@GetMapping("/timesheet/by-employee/{employeeId}")
	List<Timesheet> findByEmployeeId(@PathVariable int employeeId);
	
//	//GET findByEmployeeId() 3 of 11
//	@GetMapping("/by-employee/{employeeId}")
//	public List<Timesheet> findByEmployeeId(@PathVariable int employeeId) {
//	  return svc.byEmployee(employeeId);
//	}


}
