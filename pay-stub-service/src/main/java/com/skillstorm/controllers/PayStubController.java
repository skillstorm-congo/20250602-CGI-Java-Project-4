package com.skillstorm.controllers;

import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.models.PayStub;
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
	

	//find all pay stub records with Error Response (Method 1 of 3)
	@GetMapping
	public ResponseEntity<Iterable<PayStub>> findAll() //issue is here
	{
		return this.service.findAll();
	}
	
	
	//find a pay stub record by pay stub id with Error Response (Method 2 of 3)
	@GetMapping("/{id}")
	public ResponseEntity<PayStub> findByPayStubId(@PathVariable int id)
	{
		return this.service.findByPayStubId(id);
	}
	
	//find a pay stub record(s) by employee id with Error Response (Method 3 of 4)
	@GetMapping //("/")
	public ResponseEntity<Iterable<PayStub>> findByEmployeeId(@RequestParam(required=true) int employeeId)
	{
		return this.service.findByEmployeeId(employeeId);
	}
	
	//find a pay stub record(s) by employee id with Error Response (Method 3 of 4)
	@GetMapping //("/")
	public ResponseEntity<Iterable<PayStub>> findByManagerId(@RequestParam(required=true) int managerId)
	{
		return this.service.findByManagerId(managerId);
	}
	
	//find a pay stub record(s) by date with Error Response (Method 3 of 4)
	@GetMapping //("/")
	public ResponseEntity<Iterable<PayStub>> findByDate(@RequestParam(required=true) LocalDate date)
	{
		return this.service.findByDate(date);
	}

	
	
	//post/create payStub()
	
	//put/update payStub()

	
	
}
