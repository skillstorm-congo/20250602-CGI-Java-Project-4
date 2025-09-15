package com.skillstorm.config;

import java.util.List;

//import org.springframework.security.config.Customizer;

//import java.util.Arrays;
//import java.util.LinkedList;
//import org.springframework.http.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class SecurityConfiguration {
	
	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http
	      .csrf(csrf -> csrf.disable()) //REST + Postman
	      .cors(Customizer.withDefaults()) //looking for Cors bean
	      .authorizeHttpRequests(auth -> auth
	        .requestMatchers("/timesheet/**", "/actuator/**").permitAll()
	        .anyRequest().permitAll()   //come back later
	      )
	      .httpBasic(Customizer.withDefaults())
	      .formLogin(form -> form.disable());
	    return http.build();
	  }
	
	@Bean
	  CorsFilter corsFilter() {
		CorsConfiguration cfg = new CorsConfiguration();
		cfg.setAllowedOriginPatterns(List.of("http://localhost:5173"));
	    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
	    cfg.setAllowedHeaders(List.of("Authorization","Content-Type","X-XSRF-TOKEN"));
	    cfg.setAllowCredentials(true); // allow cookies

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", cfg);
	    return new CorsFilter(source);
	}
	
}

