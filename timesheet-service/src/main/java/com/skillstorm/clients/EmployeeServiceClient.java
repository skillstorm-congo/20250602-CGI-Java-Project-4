package com.skillstorm.clients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.cloud.openfeign.FeignClient;

import com.skillstorm.models.Employee;

@FeignClient(name = "employee-service")
public interface EmployeeServiceClient {
	//find all employee records by manager id
	@GetMapping("/employee/manager-id")
	ResponseEntity<Iterable<Employee>> findByManagerId(@RequestParam(required=true) int managerId);
	

}
