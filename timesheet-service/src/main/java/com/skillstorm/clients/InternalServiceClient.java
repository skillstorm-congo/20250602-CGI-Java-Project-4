package com.skillstorm.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "internal-service")
public interface InternalServiceClient {
	
	//make sure you match the full URL suffix for the endpoint, the return type, and RequestParams/PathVariables/RequestBody
	@GetMapping("/internal")
	ResponseEntity<String> getHello();

}
