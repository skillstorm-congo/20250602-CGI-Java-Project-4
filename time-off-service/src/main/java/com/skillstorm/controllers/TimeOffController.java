package com.skillstorm.controllers;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.skillstorm.models.TimeOff;
import com.skillstorm.services.TimeOffService;

@RestController
@RequestMapping("/time-off")
public class TimeOffController 
{
	
	//injecting a Service bean, instantiate the final variable and set up the only constructor
	private final TimeOffService service;
	
	public TimeOffController(TimeOffService service)
	{
		this.service = service;
	}
	
	//find all time off records with Error Response (Method 1 of 8)
	@GetMapping
	public ResponseEntity<Iterable<TimeOff>> findAll() 
	{
		return this.service.findAll();
	}
	
	
	//find a time off record by time off id with Error Response (Method 2 of 8)
	@GetMapping("/{id}")
	public ResponseEntity<TimeOff> findByTimeOffId(@PathVariable int id)
	{
		return this.service.findByTimeOffId(id);
	}
	
	//find a time off record(s) by employee id with Error Response (Method 3 of 8)
	@GetMapping("/employee-id")
	public ResponseEntity<Iterable<TimeOff>> findByEmployeeId(@RequestParam(required=true) int employeeId)
	{
		return this.service.findByEmployeeId(employeeId);
	}
	
	//find a time off record(s) by manager id with Error Response (Method 4 of 8)
	@GetMapping("/manager-id")
	public ResponseEntity<Iterable<TimeOff>> findByManagerId(@RequestParam(required=true) int managerId)
	{
		return this.service.findByManagerId(managerId);
	}
	
	//find a time off record(s) by date with Error Response (Method 5 of 8)
	@GetMapping("/date")
	public ResponseEntity<Iterable<TimeOff>> findByDate(@RequestParam(required=true) LocalDate date)
	{
		return this.service.findByDate(date);
	}

	
	//create a time off request (Method 6 of 8)
	@PostMapping
	public ResponseEntity<TimeOff> createTimeOff(@RequestBody TimeOff timeOff)
	{
		TimeOff newTimeOff = this.service.createTimeOff(timeOff);
		
		return this.service.findByTimeOffId(newTimeOff.getId());
	}
	
	//update a time off record (Method 7 of 8)
	@PutMapping("/{id}")
	public ResponseEntity<TimeOff> updateTimeOff(@PathVariable int id, @RequestBody TimeOff timeOff) 
	{
		TimeOff newTimeOff = this.service.updateTimeOff(id, timeOff);
		
		return this.service.findByTimeOffId(newTimeOff.getId());
	}
	
	//delete a time off record (Method 8 of 8)
	@DeleteMapping("/{id}")
	public ResponseEntity<TimeOff> deleteById(@PathVariable int id)
	{
			return this.service.deletById(id);
	}
	

}
