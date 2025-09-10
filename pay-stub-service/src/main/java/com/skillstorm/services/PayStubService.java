package com.skillstorm.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.clients.EmployeeServiceClient;
import com.skillstorm.models.Employee;
import com.skillstorm.models.PayStub;
import com.skillstorm.repositories.PayStubRepository;

@Service
public class PayStubService 
{
	
	//inject repository bean
	private final PayStubRepository repo;
	
	//inject EmployeeServiceClient bean & add to constructor
	private final EmployeeServiceClient employeeServiceClient;

	
	//constructor injection, only every going to have one of this class, annotation is optional since it's the only constructor
	public PayStubService(PayStubRepository repo, EmployeeServiceClient employeeServiceClient) 
	{
		this.repo = repo;
		this.employeeServiceClient = employeeServiceClient;
	}
	

	//find all pay stub records (Method 1 of 8)
	public ResponseEntity<Iterable<PayStub>> findAll()
	{
		Iterable<PayStub> payStubs = this.repo.findAll();
		
		if (!payStubs.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStubs);
	}
	
	//find a pay stub record by pay stub id (Method 2 of 8)
	public ResponseEntity<PayStub> findByPayStubId(int id)
	{
		Optional<PayStub> payStub = this.repo.findById(id);
		
		if (payStub.isPresent())
			return ResponseEntity.ok(payStub.get());
		return ResponseEntity.notFound().build();
	}
		
	//find a pay stub record(s) by employee id (Method 3 of 8)
	public ResponseEntity<Iterable<PayStub>> findByEmployeeId(int employeeId)
	{
		Iterable<PayStub> payStub = this.repo.findByEmployeeId(employeeId);
		
		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
	
	//find a pay stub record(s) by manager id (Method 4 of 8)
	public ResponseEntity<Iterable<PayStub>> findByManagerId(int managerId)
	{
		//get all employee ids associated to a manager id
		ResponseEntity<Iterable<Employee>> employees = this.employeeServiceClient.findByManagerId(managerId);
		
		//iterate through each employee and add the employee id to a list
		ArrayList<Integer> employeeList = new ArrayList<Integer>();
				
		for (Employee employee : employees.getBody())
		{
			employeeList.add(employee.getId());
		}
		
		//find all pay stubs where employee ids are in the employeeList
		Iterable<PayStub> payStub = this.repo.findByManagerId(employeeList);

		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
		
	//find a pay stub record(s) by date (Method 5 of 8)
	public ResponseEntity<Iterable<PayStub>> findByDate(LocalDate date)
	{
		Iterable<PayStub> payStub = this.repo.findByDate(date);
		
		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
		
	
	//create a pay stub (Method 6 of 8)
	public PayStub createPayStub(PayStub payStub)
	{
		//If ID DNE, create a new record, else return Error Response, we do not want to overwrite an existing record
		if (!this.repo.existsById(payStub.getId()))
		{

			//insert the new product object to payStub table
			this.repo.save(payStub);
			
			return payStub;
		}
		
		//create a non-existent pay stub object
		PayStub payStubError = new PayStub(-99);
		
		return payStubError; 
	}
	
	//update an existing pay stub record (Method 7 of 8)
	public PayStub updatePayStub(int id, PayStub payStub) 
	{
		//if ID exists, update the record else return 404 Error Response
		if (this.repo.existsById(id))
		{
			Optional<PayStub> recordFound = this.repo.findById(id);
			
			if (recordFound.isPresent())
			{
				
				//check if pay stub date is null if it is, then update record
				if (recordFound.get().getPayStubDate() == null)
				{
					//update the record
					this.repo.save(payStub);
								
					return payStub;
				}
			}
		}
		
		//id does not exist or pay stub date is NOT null so you can not update it - create a non-existent pay stub object
		PayStub payStubError = new PayStub(-99);
		
		return payStubError; 
	}
	
	
	//delete a pay stub record (Method 8 of 8)
	public ResponseEntity<PayStub> deletById(int id)
	{
		this.repo.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	

}
