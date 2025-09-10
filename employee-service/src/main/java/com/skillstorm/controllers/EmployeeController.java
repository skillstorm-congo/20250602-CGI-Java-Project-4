package com.skillstorm.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.models.Employee;
import com.skillstorm.services.EmployeeService;


@RestController
@RequestMapping("/employee")
public class EmployeeController 
{
	//injecting a Service bean, instantiate the final variable and set up the only constructor
	private final EmployeeService service;
	
	public EmployeeController(EmployeeService service)
	{
		this.service = service;
	}
	
	//find all employee records by manager id
	@GetMapping("/manager-id")
	public ResponseEntity<Iterable<Employee>> findByManagerId(@RequestParam(required=true) int managerId)
	{
		return this.service.findByManagerId(managerId);
	}
	
}
