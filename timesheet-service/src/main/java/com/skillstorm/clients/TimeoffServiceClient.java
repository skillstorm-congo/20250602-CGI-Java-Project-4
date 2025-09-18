package com.skillstorm.clients;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "time-off-service")
public interface TimeoffServiceClient {
	  //get /time-off/employee-id?employeeId=123
	  @GetMapping("/employee-id")
	  ResponseEntity<List<TimeOffView>> findByEmployeeId(@RequestParam int employeeId);
	
	  //get /time-off/{id}
	  @GetMapping("/{id}")
	  ResponseEntity<TimeOffView> findById(@PathVariable int id);

	  //only what's needed from time off model.
	  public static record TimeOffView(
	      int id,
	      int employeeId,
	      LocalDate dateStart,
	      LocalDate dateEnd,
	      Boolean approved,
	      Boolean submitted,
	      String comment
	  ) {}
}
