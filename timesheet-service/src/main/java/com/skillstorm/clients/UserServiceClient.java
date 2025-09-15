package com.skillstorm.clients;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

//pointing to the user-service microservice
@FeignClient(name = "user-service")
public interface UserServiceClient {
	
	@GetMapping("/user/employeeUser")
	Map<String, Object> userEmployee();
	//ResponseEntity<EmployeeUserDTO> employeeUser(@PathVariable Principal principal);
}
