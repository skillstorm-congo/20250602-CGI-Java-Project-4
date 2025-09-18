package com.skillstorm.config;

import java.util.List;

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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfiguration {
	
	@Bean
	  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(Customizer.withDefaults())
        // authorizeHttpRequests tells spring security how to handle incoming requests
        .authorizeHttpRequests((request) -> 
            request
                .requestMatchers("/user/private").authenticated() 					  //Basic AUTH -> return 200 if valid credentials             
                .requestMatchers("/user/login").authenticated()   					  //Basic AUTH -> return 200 if valid credentials         
                .requestMatchers("/user/register", "/user/login-status").permitAll()  //Public -> used by app to see if you're logged in
                .requestMatchers("/user/register/admin").authenticated()       		  //Basic AUTH -> return 200 if valid credentials
                .requestMatchers("/user/employeeUser").authenticated()				  //Basic AUTH -> return 200 if valid credentials
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
	@Bean
	  CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration cfg = new CorsConfiguration();
	    cfg.setAllowedOrigins(List.of("http://localhost:5173"));
	    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
	    cfg.setAllowedHeaders(List.of("Authorization","Content-Type","X-XSRF-TOKEN"));
	    cfg.setAllowCredentials(true); // allow cookies

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", cfg);
	    return source;
	  }
}
