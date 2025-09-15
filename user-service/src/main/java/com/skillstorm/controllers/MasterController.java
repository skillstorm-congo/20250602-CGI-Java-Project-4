package com.skillstorm.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.services.MasterService;

@RestController
@RequestMapping("/masters")

public class MasterController {
private MasterService service;
	
	public MasterController(MasterService service) {
		this.service = service;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> findById(@PathVariable int id) {
		return this.service.findById(id);
	}
}
