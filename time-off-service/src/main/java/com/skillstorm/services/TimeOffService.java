package com.skillstorm.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.clients.EmployeeServiceClient;
import com.skillstorm.models.Employee;
import com.skillstorm.models.TimeOff;
import com.skillstorm.repositories.TimeOffRepository;

@Service
public class TimeOffService 
{

	//inject repository bean
	private final TimeOffRepository repo;
	
	//inject EmployeeServiceClient bean & add to constructor
	private final EmployeeServiceClient employeeServiceClient;

	
	//constructor injection, only every going to have one of this class, annotation is optional since it's the only constructor
	public TimeOffService(TimeOffRepository repo, EmployeeServiceClient employeeServiceClient) 
	
	{
		this.repo = repo;
		this.employeeServiceClient = employeeServiceClient;
	}
	

	//find all time off records (Method 1 of 8)
	public ResponseEntity<Iterable<TimeOff>> findAll()
	{
		Iterable<TimeOff> timeOffs = this.repo.findAll();
		
		if (!timeOffs.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(timeOffs);
	}
	
	//find a time off record by time off id (Method 2 of 8)
	public ResponseEntity<TimeOff> findByTimeOffId(int id)
	{
		Optional<TimeOff> timeOff = this.repo.findById(id);
		
		if (timeOff.isPresent())
			return ResponseEntity.ok(timeOff.get());

		return ResponseEntity.notFound().build();
	}
		
	//find a time off record(s) by employee id (Method 3 of 8)
	public ResponseEntity<Iterable<TimeOff>> findByEmployeeId(int employeeId)
	{
		Iterable<TimeOff> timeOff = this.repo.findByEmployeeId(employeeId);
		
		if (!timeOff.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(timeOff);
	}
	
	//find a time off record(s) by manager id (Method 4 of 8)
	public ResponseEntity<Iterable<TimeOff>> findByManagerId(int managerId)
	{
		//get all employee ids associated to a manager id
		ResponseEntity<Iterable<Employee>> employees = this.employeeServiceClient.findByManagerId(managerId);
		
		//iterate through each employee and add the employee id to a list
		ArrayList<Integer> employeeList = new ArrayList<Integer>();
				
		for (Employee employee : employees.getBody())
		{
			employeeList.add(employee.getId());
		}
		
		//find all time off records where employee ids are in the employeeList
		Iterable<TimeOff> timeOffs = this.repo.findByManagerId(employeeList);

		if (!timeOffs.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(timeOffs);
	}
		
	//find a time off record(s) by date (Method 5 of 8)
	public ResponseEntity<Iterable<TimeOff>> findByDate(LocalDate date)
	{
		Iterable<TimeOff> timeOffs = this.repo.findByDate(date);
		
		if (!timeOffs.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(timeOffs);
	}
		
	
	//create a time off request (Method 6 of 8)
	public TimeOff createTimeOff(TimeOff timeOff)
	{
		//If ID DNE, create a new record, else return Error Response, we do not want to overwrite an existing record
		if (!this.repo.existsById(timeOff.getId()))
		{

			//insert the new product object to payStub table
			this.repo.save(timeOff);
			
			return timeOff;
		}
		
		//create a non-existent pay stub object
		TimeOff timeOffError = new TimeOff(-99);
		
		return timeOffError; 
	}
	
	//update an existing pay stub record (Method 7 of 8)
	public TimeOff updateTimeOff(int id, TimeOff timeOff) 
	{
		//if ID exists, update the record else return 404 Error Response
		if (this.repo.existsById(id))
		{
			
			Optional<TimeOff> recordFound = this.repo.findById(id);
			
			if (recordFound.isPresent())
			{
				
				//check if approved date is null if it is, then update record
				if (recordFound.get().getApprovedDate() == null)
				{
					//update the record
					this.repo.save(timeOff);
							
					return timeOff;
				}
			}
		}
		
		//id does not exist or approved date is NOT null so you can not update it - create a non-existent time off object
		TimeOff timeOffError = new TimeOff(-99);
		
		return timeOffError; 
	}
	
	
	//delete a time off record (Method 8 of 8)
	public ResponseEntity<TimeOff> deletById(int id)
	{
		this.repo.deleteById(id);
		
		return ResponseEntity.noContent().build();
	}
	
	
}
