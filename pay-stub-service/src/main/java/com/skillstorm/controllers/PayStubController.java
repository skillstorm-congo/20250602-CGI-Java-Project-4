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

import com.skillstorm.models.PayStub;
import com.skillstorm.models.Timesheet;
import com.skillstorm.services.PayStubService;


@RestController
@RequestMapping("/pay-stub")
public class PayStubController 
{
	//injecting a Service bean, instantiate the final variable and set up the only constructor
	private final PayStubService service;
	
	public PayStubController(PayStubService service)
	{
		this.service = service;
	}
	
	//find all pay stub records with Error Response (Method 1 of 9)
	@GetMapping
	public ResponseEntity<Iterable<PayStub>> findAll() 
	{
		return this.service.findAll();
	}
	
	//find a pay stub record by pay stub id with Error Response (Method 2 of 9)
	@GetMapping("/{id}")
	public ResponseEntity<PayStub> findByPayStubId(@PathVariable int id)
	{
		return this.service.findByPayStubId(id);
	}
	
	//find a pay stub record(s) by employee id with Error Response (Method 3 of 9)
	@GetMapping("/employee-id")
	public ResponseEntity<Iterable<PayStub>> findByEmployeeId(@RequestParam(required=true) int employeeId)
	{
		return this.service.findByEmployeeId(employeeId);
	}
	
	//find a pay stub record(s) by manager id with Error Response (Method 4 of 9)
	@GetMapping("/manager-id")
	public ResponseEntity<Iterable<PayStub>> findByManagerId(@RequestParam(required=true) int managerId)
	{
		return this.service.findByManagerId(managerId);
	}
	
	//find a pay stub record(s) by date with Error Response (Method 5 of 9)
	@GetMapping("/date")
	public ResponseEntity<Iterable<PayStub>> findByDate(@RequestParam(required=true) LocalDate date)
	{
		return this.service.findByDate(date);
	}

	
	//create a pay stub (Method 6 of 9)
	@PostMapping
	public ResponseEntity<PayStub> createPayStub(@RequestBody PayStub payStub)
	{
		PayStub newPayStub = this.service.createPayStub(payStub);
		
		return this.service.findByPayStubId(newPayStub.getId());
	}
	
	//update a pay stub (Method 7 of 9)
	@PutMapping("/{id}")
	public ResponseEntity<PayStub> updatePayStub(@PathVariable int id, @RequestBody PayStub payStub) 
	{
		PayStub newPayStub = this.service.updatePayStub(id, payStub);
		
		return this.service.findByPayStubId(newPayStub.getId());
	}
	
	//delete a pay stub (Method 8 of 9)
	@DeleteMapping("/{id}")
	public ResponseEntity<PayStub> deleteById(@PathVariable int id)
	{
			return this.service.deletById(id);
	}
	
	//find a pay stub record(s) by employee id with Error Response (Method 9 of 9)
	@GetMapping("/timesheet/{employeeId}")
	public ResponseEntity<Iterable<Timesheet>> findTimesheetsByEmployeeId(@PathVariable int employeeId)
	{
		return this.service.findTimesheetsByEmployeeId(employeeId);
	}
	

	
}
