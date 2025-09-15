package com.skillstorm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class SecurityConfiguration {
	
	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
        // authorizeHttpRequests tells spring security how to handle incoming requests
        .authorizeHttpRequests((request) -> 
            request
                .requestMatchers("/user/private").authenticated()              
                .requestMatchers("/user/login").authenticated()              
                .requestMatchers("/user/register", "/user/login-status").permitAll()  
                .requestMatchers("/user/register/admin").authenticated()       
        )
        
        .httpBasic(basic -> {})
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .csrf((csrf) -> 
            csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).ignoringRequestMatchers("/user/register")
        );
    return http.build();
	  }
	
	@Bean
	  PasswordEncoder passwordEncoder() {
	    //storing "{password stuff as bcrypt}$2b$..."
	    return new BCryptPasswordEncoder(10);
	  }
}
