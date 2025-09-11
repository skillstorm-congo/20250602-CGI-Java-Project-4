package com.skillstorm.config;

import org.springframework.security.config.Customizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
	
	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	      .csrf(csrf -> csrf.disable()) //REST + Postman
	      .authorizeHttpRequests(auth -> auth
	        .requestMatchers("/timesheet/**", "/actuator/**").permitAll()
	        .anyRequest().permitAll()   //come back later
	      )
	      .httpBasic(Customizer.withDefaults())
	      .formLogin(form -> form.disable());
	    return http.build();
	  }
	
	@Bean
	  PasswordEncoder passwordEncoder() {
	    //storing "{password stuff as bcrypt}$2b$..."
	    return new BCryptPasswordEncoder(10);
	  }
}
