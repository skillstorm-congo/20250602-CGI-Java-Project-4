package com.skillstorm.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.skillstorm.models.Timesheet;
import com.skillstorm.services.TimesheetService;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {
	
	private final TimesheetService svc;
	
	@Autowired
	public TimesheetController(TimesheetService svc) {
	  this.svc = svc;
	}

	//GET findAll() 1 of 11
	@GetMapping
    public ResponseEntity<List<Timesheet>> findAll() { return svc.getAll(); }

	//GET findById() 2 of 11
	@GetMapping("/{id}")
	public Timesheet findById(@PathVariable int id) { return svc.get(id); }

	//GET findByEmployeeId() 3 of 11
	@GetMapping("/by-employee/{employeeId}")
	public List<Timesheet> findByEmployeeId(@PathVariable int employeeId) {
	  return svc.byEmployee(employeeId);
	}

	//GET findByManagerId() 4 of 11
	@GetMapping("/manager-id/{managerId}")
	public ResponseEntity<Iterable<Timesheet>> findByManagerId(@PathVariable int managerId) {
	  return this.svc.findByManagerId(managerId);
	}

	//GET findByDate() 5 of 11
	@GetMapping("/by-date")
	public List<Timesheet> findByDate(
	    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
	  return svc.byDate(date);
	}

	//POST logHours() 6 of 11
	@PostMapping("/log-hours")
	public ResponseEntity<Timesheet> lLogHours(@RequestBody Timesheet body) {
	  boolean existed = svc.exists(body.getId());
	  Timesheet saved = svc.logHours(body);
	  return existed
	      ? ResponseEntity.ok(saved)
	      : ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}

	//PUT submit() 7 of 11
	@PutMapping("/{id}/submit")
	public Timesheet submit(@PathVariable int id) {
		return svc.submit(id); 
	}

	//PUT approvedByManagerId() 8 of 11
	@PutMapping("/{id}/approve-by-manager/{managerId}")
	public Timesheet approvedByManagerId(
			@PathVariable("id") int id, 
			@PathVariable("managerId") int managerId) {
		return svc.approve(id, managerId); 
	}
	
	//PUT unapprove() 9 of 11
	@PutMapping("/{id}/unapprove")
	public Timesheet unapprove(@PathVariable int id, @PathVariable("managerId") int managerId) {
		return svc.unapprove(id, managerId);
	}
	
	//PUT updateHours() 10 of 11
	@PutMapping(path = "/update-hours", consumes = "application/json")
	public Timesheet updateHours(@RequestBody Timesheet body) {
	  return svc.updateHoursByBody(body);
	}

	//DELETE deleteTimesheet() 11 of 11
	@DeleteMapping("/delete/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTimesheet(@PathVariable int id) { 
		svc.delete(id); 
	}
}
