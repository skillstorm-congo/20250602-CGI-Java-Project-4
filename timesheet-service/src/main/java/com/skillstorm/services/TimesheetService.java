package com.skillstorm.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.Consumer;

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
	
	//inject EmployeeServiceClient bean & add to constructor
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

	//public List<Timesheet> byManager(int managerId) {
	  //return repo.findByManagerId(managerId);
	//}
	//find a pay stub record(s) by manager id (Method 3 of 4)
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

	//update CHECK -- by date in general
	public List<Timesheet> byDate(LocalDate date) {
	  return repo.findCoveringDate(date);
	}

	//write action
	@Transactional
	public Timesheet create(Timesheet ts) {
	  repo.save(ts);
	  return reload(ts.getId()); //read back to populate generated columns
	}

	/* Partial update: copies only non-null mutable fields from 'patch' onto the stored entity. */
	@Transactional
	public Timesheet patch(int id, Timesheet patch) {
	  Timesheet t = get(id);

	  if (patch.getEmployeeId() != null) t.setEmployeeId(patch.getEmployeeId());
	  if (patch.getDateStart() != null)  t.setDateStart(patch.getDateStart());
	  if (patch.getDateEnd() != null)    t.setDateEnd(patch.getDateEnd());
	  if (patch.getSubmitted() != null)  t.setSubmitted(patch.getSubmitted());
	  if (patch.getSubmittedDate() != null) t.setSubmittedDate(patch.getSubmittedDate());
	  if (patch.getApproved() != null)   t.setApproved(patch.getApproved());
	  if (patch.getApprovedDate() != null) t.setApprovedDate(patch.getApprovedDate());
	  if (patch.getComment() != null)    t.setComment(patch.getComment());
      if (patch.getTimeOffId() != null)  t.setTimeOffId(patch.getTimeOffId());

	  if (patch.getRegularHoursDay1() != null) t.setRegularHoursDay1(patch.getRegularHoursDay1());
	  if (patch.getRegularHoursDay2() != null) t.setRegularHoursDay2(patch.getRegularHoursDay2());
	  if (patch.getRegularHoursDay3() != null) t.setRegularHoursDay3(patch.getRegularHoursDay3());
	  if (patch.getRegularHoursDay4() != null) t.setRegularHoursDay4(patch.getRegularHoursDay4());
	  if (patch.getRegularHoursDay5() != null) t.setRegularHoursDay5(patch.getRegularHoursDay5());

	  if (patch.getOvertimeHoursDay1() != null) t.setOvertimeHoursDay1(patch.getOvertimeHoursDay1());
	  if (patch.getOvertimeHoursDay2() != null) t.setOvertimeHoursDay2(patch.getOvertimeHoursDay2());
	  if (patch.getOvertimeHoursDay3() != null) t.setOvertimeHoursDay3(patch.getOvertimeHoursDay3());
	  if (patch.getOvertimeHoursDay4() != null) t.setOvertimeHoursDay4(patch.getOvertimeHoursDay4());
	  if (patch.getOvertimeHoursDay5() != null) t.setOvertimeHoursDay5(patch.getOvertimeHoursDay5());

	  if (patch.getTimeOffHoursDay1() != null) t.setTimeOffHoursDay1(patch.getTimeOffHoursDay1());
	  if (patch.getTimeOffHoursDay2() != null) t.setTimeOffHoursDay2(patch.getTimeOffHoursDay2());
	  if (patch.getTimeOffHoursDay3() != null) t.setTimeOffHoursDay3(patch.getTimeOffHoursDay3());
	  if (patch.getTimeOffHoursDay4() != null) t.setTimeOffHoursDay4(patch.getTimeOffHoursDay4());
	  if (patch.getTimeOffHoursDay5() != null) t.setTimeOffHoursDay5(patch.getTimeOffHoursDay5());

	  repo.save(t);
	  return reload(id);
	}

	@Transactional
	public Timesheet submit(int id) {
	  Timesheet t = get(id);
	  t.setSubmitted(true);
	  t.setSubmittedDate(LocalDate.now());
	  repo.save(t);
	  return reload(id);
	}

	//UPDATE to be approved by manager id
	@Transactional
	public Timesheet approve(int id, int managerId) {
	  Timesheet t = get(id);
	  
	  if (t.getApproved() != null && t.getApproved()) {
	   // already approved – choose behavior; 409 is common
	   throw new ResponseStatusException(HttpStatus.CONFLICT, "Timesheet already approved.");
	  }
	  
	  if (t.getSubmitted() == null || !t.getSubmitted()) {
	    throw new IllegalStateException("Cannot approve a timesheet that hasn't been submitted.");
	  }
	  
	//pull employees under this manager from the employee-service
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
	    //manager is not authorized to approve this ts
	    throw new ResponseStatusException(HttpStatus.FORBIDDEN,
	        "Manager " + managerId + " is not allowed to approve timesheet " + id);
	  }
	  
	  t.setApproved(true);
	  t.setApprovedDate(LocalDate.now());
	  repo.save(t);
	  return reload(id);
	}

	@Transactional
	public Timesheet logHours(int id, int day, String type, BigDecimal hours) {
	  Timesheet t = get(id);
	  applyHours(t, day, type, hours);
	  repo.save(t);
	  return reload(id);
	}

	public void delete(int id) {
	  repo.deleteById(id);
	}

	//helper methods
	private Timesheet reload(Integer id) {
	  return repo.findById(id).orElseThrow(() ->
	      new NoSuchElementException("Timesheet " + id + " disappeared after save"));
	}

	private static void applyHours(Timesheet t, int day, String rawType, BigDecimal hours) {
	  if (day < 1 || day > 5) throw new IllegalArgumentException("day must be 1..5");
	  if (hours == null || hours.signum() < 0) throw new IllegalArgumentException("hours must be >= 0");
	  String type = rawType == null ? "" : rawType.toLowerCase();

	  switch (type) {
	    case "regular" -> setDay(hours, day,
	        t::setRegularHoursDay1, t::setRegularHoursDay2, t::setRegularHoursDay3, t::setRegularHoursDay4, t::setRegularHoursDay5);
	    case "overtime" -> setDay(hours, day,
	        t::setOvertimeHoursDay1, t::setOvertimeHoursDay2, t::setOvertimeHoursDay3, t::setOvertimeHoursDay4, t::setOvertimeHoursDay5);
	    case "timeoff", "time_off", "pto" -> setDay(hours, day,
	        t::setTimeOffHoursDay1, t::setTimeOffHoursDay2, t::setTimeOffHoursDay3, t::setTimeOffHoursDay4, t::setTimeOffHoursDay5);
	    default -> throw new IllegalArgumentException("type must be one of: regular | overtime | timeOff");
	  }
	}

	@SafeVarargs
	private static void setDay(BigDecimal v, int day, Consumer<BigDecimal>... setters) {
	  setters[day - 1].accept(v);
	}
}
