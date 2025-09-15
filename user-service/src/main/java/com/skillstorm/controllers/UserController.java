package com.skillstorm.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.dtos.EmployeeUserDTO;
import com.skillstorm.models.User;
import com.skillstorm.repositories.UserRepository;
import com.skillstorm.services.UserService;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.lang.Nullable;


@RestController
@RequestMapping("/user")

public class UserController {
	
	private final UserService userService;
	private final UserRepository userRepo;

    UserController(UserService userService, UserRepository userRepo) {
        this.userService = userService;
        this.userRepo = userRepo;
    }
    
    @GetMapping("/private")
    public String privateData(Principal principal, Authentication auth) {

        /**
         * created and populated by SecurityContext
         *  - Principal - the user. info on the user. 
         *  - Authentication - info about auth 
         */

        return "some private data: " + principal.getName();
    }


    @GetMapping("/login")
    public ResponseEntity<String> login(Principal principal, CsrfToken token) {
        if(token.getToken() != null){
            return ResponseEntity.ok("User: [" + principal.getName() + "] is signed in.");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).header("message", "User: is not signed in.").build();
    }
    
    @GetMapping("/login-status")
    public ResponseEntity<String> loginStatus(@Nullable Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not signed in.");
        }
        return ResponseEntity.ok("User [" + principal.getName() + "] is signed in.");
    }


    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        try {
            userService.register(user);
            return new ResponseEntity<>(HttpStatus.CREATED);        // 201
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }

    @PostMapping("/register/admin")
    public ResponseEntity<Void> registerAdmin(@RequestBody User user) {
        try {
            userService.registerAdmin(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);     // 204
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().header("message", e.getMessage()).build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().header("message", e.getMessage()).build();
        }
    }
    
    @GetMapping("/employeeUser")
    public EmployeeUserDTO employeeUser(Principal principal) {
    	
    	User user = userRepo.findByUsername(principal.getName())
    			.orElseThrow(() -> new RuntimeException("User not found: " + principal.getName()));
    	return new EmployeeUserDTO(user.getId(), user.getEmployeeId(), user.getUsername(), user.getRole());
    }

}
