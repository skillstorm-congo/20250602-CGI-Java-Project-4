package com.skillstorm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfiguration {

	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	      .csrf(csrf -> csrf.disable()) //REST + Postman
	      .authorizeHttpRequests(auth -> auth
	        //.requestMatchers("/actuator/**").permitAll()
	        
	        //ADMIN endpoints
	        //.requestMatchers("GET", "/timesheet").hasRole("ADMIN")
	        //.requestMatchers("GET",  "/timesheet/manager-id/**").hasRole("ADMIN")
	        // .requestMatchers("PUT",  "/timesheet/*/approve-by-manager/**").hasRole("ADMIN")
	        //.requestMatchers("PUT",  "/timesheet/*/unapprove").hasRole("ADMIN")
	        //.requestMatchers("DELETE","/timesheet/delete/**").hasRole("ADMIN")
	        
	        //use needs a valid login credentials
	        //.requestMatchers("/timesheet/**").authenticated()
	    		  
	    		  .requestMatchers("/**").permitAll()
	      )
	      .httpBasic(Customizer.withDefaults())
	      .formLogin(form -> form.disable());
	    
	    return http.build();
	}
}












