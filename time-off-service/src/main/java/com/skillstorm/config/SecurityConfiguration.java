package com.skillstorm.config;

//import org.springframework.security.config.Customizer;

//import java.util.Arrays;
//import java.util.LinkedList;
//import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfiguration {
	
	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	      .csrf(csrf -> csrf.disable()) //REST + Postman
	      .authorizeHttpRequests(auth -> auth
	        .requestMatchers("/time-off/**", "/actuator/**", "/swagger-ui/**", "/api-docs/**").permitAll()
	        .anyRequest().permitAll()   //come back later
	      )
	      .httpBasic(Customizer.withDefaults())
	      .formLogin(form -> form.disable());
	    return http.build();
	  }
	
}

