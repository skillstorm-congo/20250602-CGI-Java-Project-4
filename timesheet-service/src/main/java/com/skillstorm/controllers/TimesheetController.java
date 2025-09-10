package com.skillstorm.controllers;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

	@GetMapping
    public List<Timesheet> findAll() { return svc.getAll(); }

	@GetMapping("/{id}")
	public Timesheet findById(@PathVariable int id) { return svc.get(id); }

	@GetMapping("/by-employee/{employeeId}")
	public List<Timesheet> findByEmployeeId(@PathVariable int employeeId) {
	  return svc.byEmployee(employeeId);
	}

	@GetMapping("/manager-id")
	public ResponseEntity<Iterable<Timesheet>> findByManagerId(@RequestParam(required=true) int managerId)
	{
		return this.svc.findByManagerId(managerId);
	}

	@GetMapping("/by-date")
	public List<Timesheet> findByDate(
	    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
	  return svc.byDate(date);
	}

	//request params, enter more than 1x day/hours at a time
	@PostMapping("/{id}/log-hours")
	public Timesheet logHours(@PathVariable int id,
	                          @RequestParam int day,
	                          @RequestParam String type,      // regular | overtime | timeOff
	                          @RequestParam BigDecimal hours) {
	  return svc.logHours(id, day, type, hours);
	}

	@PutMapping("/{id}/submit")
	public Timesheet submit(@PathVariable int id) { return svc.submit(id); }

	//update to approveByManagerId()
	@PutMapping("/{id}/approve-by-manager/{managerId}")
	public Timesheet approvedByManagerId(
			@PathVariable("id") int id, 
			@PathVariable("managerId") int managerId) {
		return svc.approve(id, managerId); }

	//paste from POST and update as needed
	@PutMapping("/{id}/update-hours")
	public Timesheet updateHours(@PathVariable int id, @RequestBody Timesheet patch) {
	  return svc.patch(id, patch);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTimesheet(@PathVariable int id) { svc.delete(id); }
}
