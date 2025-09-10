package com.skillstorm.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.models.Employee;
import com.skillstorm.repositories.EmployeeRepository;

@Service
public class EmployeeService {
	
	//inject repository bean
	private final EmployeeRepository repo;
	
	//constructor injection, only every going to have one of this class, annotation is optional since it's the only constructor
	public EmployeeService(EmployeeRepository repo) 
	{
		this.repo = repo;
	}
	
	//find all employee records by manager id
	public ResponseEntity<Iterable<Employee>> findByManagerId(int managerId)
	{
		Iterable<Employee> employees = this.repo.findByManagerId(managerId);
		
		if (!employees.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(employees);
	}


}
