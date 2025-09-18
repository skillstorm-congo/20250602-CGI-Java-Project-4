package com.skillstorm.clients;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

//pointing to the user-service microservice to get the role of the user that matches an employee's ID
@FeignClient(name = "user-service")
public interface UserServiceClient {
	
	@GetMapping("user/employeeUser")
	Map<String, Object> userEmployee();
	//ResponseEntity<EmployeeUserDTO> employeeUser(@PathVariable Principal principal);
}
