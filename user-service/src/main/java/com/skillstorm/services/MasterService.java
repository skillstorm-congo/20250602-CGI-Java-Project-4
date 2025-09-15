package com.skillstorm.services;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MasterService {

public ResponseEntity<Object> findById(int id) {
		
		// using RestTemplate to make a request to another API
		// we'll eventually use .exchange to execute this request and return whatever it returns
		// but, we may need to attach some things first
		RestTemplate rt = new RestTemplate();
		
		// if we need headers, we create a headers object and attach the headers we need
		HttpHeaders headers = new HttpHeaders();
		headers.add("Accept", "application/json");
		
		// if we needed a body, which we don't here, we'd assemble that also
		
		// once we have headers and a body, we assemble them into a request entity for attaching to the template
		HttpEntity<Object> entity = new HttpEntity<Object>(null, headers);
		
		// now execute the request and get the response
		// parameters = URL being accessed, HTTP method type, the assembled request entity, the class we want to map the response to
		// if you have a class that mirrors the structure of what you're getting back, you can use that class
		// for collections coming back, it DOES NOT work to map them to a list
		// you must map them to an array instead and create a list after the fact if you need it
		ResponseEntity<Object> response = rt.exchange("https://api.discogs.com/masters/" + id, HttpMethod.GET, entity, Object.class);
		
		return ResponseEntity.ok(response.getBody());
	}
}
