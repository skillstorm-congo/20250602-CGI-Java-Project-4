package com.skillstorm.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Consumer;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.skillstorm.clients.EmployeeServiceClient;
import com.skillstorm.models.Employee;
import com.skillstorm.models.Timesheet;
import com.skillstorm.repositories.TimesheetRepository;

import jakarta.transaction.Transactional;

@Service
public class TimesheetService {
	
	private final TimesheetRepository repo;
	
	private final EmployeeServiceClient employeeServiceClient;

	public TimesheetService(TimesheetRepository repo, EmployeeServiceClient employeeServiceClient) {
		this.repo = repo;
		this.employeeServiceClient = employeeServiceClient;
	}

	public List<Timesheet> getAll() {
	    List<Timesheet> out = new ArrayList<>();
	    repo.findAll().forEach(out::add);
	    return out;
	}

	public Timesheet get(int id) {
	  return repo.findById(id).orElseThrow(() ->
	      new NoSuchElementException("Timesheet " + id + " not found"));
	}

	public List<Timesheet> byEmployee(int employeeId) {
	  return repo.findByEmployeeId(employeeId);
	}

	public ResponseEntity<Iterable<Timesheet>> findByManagerId(int managerId){
		//get all employee ids associated to a manager id
		ResponseEntity<Iterable<Employee>> employees = this.employeeServiceClient.findByManagerId(managerId);
		
		//iterate through each employee and add the employee id to a list
		ArrayList<Integer> employeeList = new ArrayList<Integer>();
				
		for (Employee employee : employees.getBody())
		{
		employeeList.add(employee.getId());
		}
		
		//find all pay stubs where employee ids are in the employeeList
		Iterable<Timesheet> payStub = this.repo.findByManagerId(employeeList);

		if (!payStub.iterator().hasNext())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		return ResponseEntity.ok(payStub);
		}

	public List<Timesheet> byDate(LocalDate date) {
	  return repo.findCoveringDate(date);
	}

	//write actions to postman to db
	@Transactional
	public Timesheet create(Timesheet ts) {
	  repo.save(ts);
	  return reload(ts.getId());
	}

	@Transactional
	public Timesheet updateHoursByBody(Timesheet patch) {
	  if (patch == null || patch.getId() == null) {
	    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id is required.");
	  }

	  Timesheet t = get(patch.getId());

	  //block edits once approved
	  if (Boolean.TRUE.equals(t.getApproved())) {
	    throw new ResponseStatusException(HttpStatus.CONFLICT, "Timesheet already approved.");
	  }

	  // validate non-negative if provided
	  validateNonNegative(patch.getRegularHoursDay1(),  "regularHoursDay1");
	  validateNonNegative(patch.getRegularHoursDay2(),  "regularHoursDay2");
	  validateNonNegative(patch.getRegularHoursDay3(),  "regularHoursDay3");
	  validateNonNegative(patch.getRegularHoursDay4(),  "regularHoursDay4");
	  validateNonNegative(patch.getRegularHoursDay5(),  "regularHoursDay5");

	  validateNonNegative(patch.getOvertimeHoursDay1(), "overtimeHoursDay1");
	  validateNonNegative(patch.getOvertimeHoursDay2(), "overtimeHoursDay2");
	  validateNonNegative(patch.getOvertimeHoursDay3(), "overtimeHoursDay3");
	  validateNonNegative(patch.getOvertimeHoursDay4(), "overtimeHoursDay4");
	  validateNonNegative(patch.getOvertimeHoursDay5(), "overtimeHoursDay5");

	  validateNonNegative(patch.getTimeOffHoursDay1(),  "timeOffHoursDay1");
	  validateNonNegative(patch.getTimeOffHoursDay2(),  "timeOffHoursDay2");
	  validateNonNegative(patch.getTimeOffHoursDay3(),  "timeOffHoursDay3");
	  validateNonNegative(patch.getTimeOffHoursDay4(),  "timeOffHoursDay4");
	  validateNonNegative(patch.getTimeOffHoursDay5(),  "timeOffHoursDay5");

	  //copy ONLY hour fields + comment/timeOffId. Ignore dates, employeeId, submitted/approved, totals, fiscal week.
	  copyIfNotNull(patch.getRegularHoursDay1(),  t::setRegularHoursDay1);
	  copyIfNotNull(patch.getRegularHoursDay2(),  t::setRegularHoursDay2);
	  copyIfNotNull(patch.getRegularHoursDay3(),  t::setRegularHoursDay3);
	  copyIfNotNull(patch.getRegularHoursDay4(),  t::setRegularHoursDay4);
	  copyIfNotNull(patch.getRegularHoursDay5(),  t::setRegularHoursDay5);

	  copyIfNotNull(patch.getOvertimeHoursDay1(), t::setOvertimeHoursDay1);
	  copyIfNotNull(patch.getOvertimeHoursDay2(), t::setOvertimeHoursDay2);
	  copyIfNotNull(patch.getOvertimeHoursDay3(), t::setOvertimeHoursDay3);
	  copyIfNotNull(patch.getOvertimeHoursDay4(), t::setOvertimeHoursDay4);
	  copyIfNotNull(patch.getOvertimeHoursDay5(), t::setOvertimeHoursDay5);

	  copyIfNotNull(patch.getTimeOffHoursDay1(),  t::setTimeOffHoursDay1);
	  copyIfNotNull(patch.getTimeOffHoursDay2(),  t::setTimeOffHoursDay2);
	  copyIfNotNull(patch.getTimeOffHoursDay3(),  t::setTimeOffHoursDay3);
	  copyIfNotNull(patch.getTimeOffHoursDay4(),  t::setTimeOffHoursDay4);
	  copyIfNotNull(patch.getTimeOffHoursDay5(),  t::setTimeOffHoursDay5);

	  if (patch.getComment() != null)   
		  t.setComment(patch.getComment());
	  
	  if (patch.getTimeOffId() != null) 
		  t.setTimeOffId(patch.getTimeOffId());

	  repo.save(t);
	  return reload(t.getId());
	}

	@Transactional
	public Timesheet submit(int id) {
	  Timesheet t = get(id);
	  t.setSubmitted(true);
	  t.setSubmittedDate(LocalDate.now());
	  repo.save(t);
	  return reload(id);
	}

	@Transactional
	public Timesheet approve(int id, int managerId) {
	  Timesheet t = get(id);
	    
	  if (t.getApproved() != null && t.getApproved()) {
	   //NOTE: already approved 409
	   throw new ResponseStatusException(HttpStatus.CONFLICT, "Timesheet already approved.");
	  }
	  
	  if (t.getSubmitted() == null || !t.getSubmitted()) {
	    throw new IllegalStateException("Cannot approve a timesheet that hasn't been submitted.");
	  }
	  
	  //pull employees under manager from the employee-service
	  var employeesResp = employeeServiceClient.findByManagerId(managerId);
	  var employees = employeesResp != null ? employeesResp.getBody() : null;
	  boolean managesThisEmployee = false;
	  if (employees != null) {
	    for (Employee e : employees) {
	      if (e.getId() == t.getEmployeeId()) {
	        managesThisEmployee = true;
	        break;
	      }
	    }
	  }

	  if (!managesThisEmployee) {
	    //manager is not authorized to approve this ts bc it's not their employee
	    throw new ResponseStatusException(HttpStatus.FORBIDDEN,
	        "Manager " + managerId + " is not allowed to approve timesheet " + id);
	  }
	  
	  t.setApproved(true);
	  t.setApprovedDate(LocalDate.now());
	  repo.save(t);
	  return reload(id);
	}
	
	@Transactional
	public Timesheet unapprove(int id) {
	  Timesheet t = get(id);
	  t.setApproved(false);
	  t.setApprovedDate(null);
	  repo.save(t);
	  return reload(id);
	}

	@Transactional
	public Timesheet logHours(Timesheet input) {
	  if (input == null || input.getId() == null || input.getEmployeeId() == null || input.getDateStart() == null) {
	    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id, employeeId, and dateStart are required.");
	  }

	  boolean exists = repo.existsById(input.getId());
	  Timesheet t = exists ? get(input.getId()) : new Timesheet();

	  if (exists) {
	    //blocks edits if already approved
	    if (Boolean.TRUE.equals(t.getApproved())) {
	      throw new ResponseStatusException(HttpStatus.CONFLICT, "Timesheet already approved.");
	    }
	    //allow date range/comment/timeOffId adjustments BEFORE approval
	    if (input.getDateEnd() != null) 
	    	t.setDateEnd(input.getDateEnd());
	    
	    if (input.getComment() != null) 
	    	t.setComment(input.getComment());
	    
	    if (input.getTimeOffId() != null) 
	    	t.setTimeOffId(input.getTimeOffId());
	  	} else {
	    //create new record with clean fields
	    t.setId(input.getId());
	    t.setEmployeeId(input.getEmployeeId());
	    LocalDate ds = input.getDateStart();
	    LocalDate de = (input.getDateEnd() != null) ? input.getDateEnd() : ds; // default end = start
	    t.setDateStart(ds);
	    t.setDateEnd(de);
	    t.setSubmitted(Boolean.FALSE);
	    t.setApproved(Boolean.FALSE);
	    t.setSubmittedDate(null);
	    t.setApprovedDate(null);
	    t.setComment(input.getComment());
	    if (input.getTimeOffId() != null) t.setTimeOffId(input.getTimeOffId());
	  }

	  //copy ONLY hour fields ->>>ignore fiscal week & totals
	  copyIfNotNull(input.getRegularHoursDay1(),  t::setRegularHoursDay1);
	  copyIfNotNull(input.getRegularHoursDay2(),  t::setRegularHoursDay2);
	  copyIfNotNull(input.getRegularHoursDay3(),  t::setRegularHoursDay3);
	  copyIfNotNull(input.getRegularHoursDay4(),  t::setRegularHoursDay4);
	  copyIfNotNull(input.getRegularHoursDay5(),  t::setRegularHoursDay5);

	  copyIfNotNull(input.getOvertimeHoursDay1(), t::setOvertimeHoursDay1);
	  copyIfNotNull(input.getOvertimeHoursDay2(), t::setOvertimeHoursDay2);
	  copyIfNotNull(input.getOvertimeHoursDay3(), t::setOvertimeHoursDay3);
	  copyIfNotNull(input.getOvertimeHoursDay4(), t::setOvertimeHoursDay4);
	  copyIfNotNull(input.getOvertimeHoursDay5(), t::setOvertimeHoursDay5);

	  copyIfNotNull(input.getTimeOffHoursDay1(),  t::setTimeOffHoursDay1);
	  copyIfNotNull(input.getTimeOffHoursDay2(),  t::setTimeOffHoursDay2);
	  copyIfNotNull(input.getTimeOffHoursDay3(),  t::setTimeOffHoursDay3);
	  copyIfNotNull(input.getTimeOffHoursDay4(),  t::setTimeOffHoursDay4);
	  copyIfNotNull(input.getTimeOffHoursDay5(),  t::setTimeOffHoursDay5);

	  repo.save(t);
	  return reload(t.getId());
	}

	public void delete(int id) {
	  repo.deleteById(id);

	}

	//helper methods
	private Timesheet reload(Integer id) {
	  return repo.findById(id).orElseThrow(() ->
	      new NoSuchElementException("Timesheet " + id + " disappeared after save"));
	}
	
	public boolean exists(Integer id) { 
		return id != null && repo.existsById(id); 
	}

	private static <T> void copyIfNotNull(T v, java.util.function.Consumer<T> set) {
		if (v != null) set.accept(v); 
	}
	private static void validateNonNegative(BigDecimal v, String field) {
		  if (v != null && v.signum() < 0) {
		    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " must be >= 0");
		  }
		}
}
