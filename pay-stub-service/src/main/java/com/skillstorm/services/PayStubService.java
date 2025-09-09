package com.skillstorm.services;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.models.PayStub;
import com.skillstorm.repositories.PayStubRepository;

@Service
public class PayStubService 
{
	
	//inject repository bean
	private final PayStubRepository repo;
	
	//constructor injection, only every going to have one of this class, annotation is optional since it's the only constructor
	public PayStubService(PayStubRepository repo) 
	{
		this.repo = repo;
	}
	

	//find all pay stub records (Method 1 of 4)
	public ResponseEntity<Iterable<PayStub>> findAll()
	{
		Iterable<PayStub> payStubs = this.repo.findAll();
		
		if (!payStubs.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStubs);
	}
	
	//find a pay stub record by pay stub id (Method 2 of 4)
	public ResponseEntity<PayStub> findByPayStubId(int id)
	{
		Optional<PayStub> payStub = this.repo.findById(id);
		
		if (payStub.isPresent())
			return ResponseEntity.ok(payStub.get());
		return ResponseEntity.notFound().build();
	}
		
	//find a pay stub record(s) by employee id (Method 3 of 4)
	public ResponseEntity<Iterable<PayStub>> findByEmployeeId(int employeeId)
	{
		Iterable<PayStub> payStub = this.repo.findByEmployeeId(employeeId);
		
		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
	
	//find a pay stub record(s) by manager id (Method 3 of 4)
	public ResponseEntity<Iterable<PayStub>> findByManagerId(int managerId)
	{
		Iterable<PayStub> payStub = this.repo.findByManagerId(managerId);
		
		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
		
	//find a pay stub record(s) by employee id (Method 3 of 4)
	public ResponseEntity<Iterable<PayStub>> findByDate(LocalDate date)
	{
		Iterable<PayStub> payStub = this.repo.findByDate(date);
		
		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
	}
		
	
	//create a pay stub (Method X of Y)
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
	
	//update an existing pay stub record (Method 5 of 7)
	public PayStub updatePayStub(int id, PayStub payStub) 
	{
		//if ID exists, update the record else return 404 Error Response
		if (this.repo.existsById(id))
		{
			//update the record
			this.repo.save(payStub);
						
			return payStub;
		}
		
		//id does not exist so you can not update it - create a non-existent pay stub object
		PayStub payStubError = new PayStub(-99);
		
		return payStubError; 
	}
	
	
	//delete a pay stub record (Method 6 of 7)
	public ResponseEntity<PayStub> deletById(int id)
	{
		this.repo.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	

	
	

}
