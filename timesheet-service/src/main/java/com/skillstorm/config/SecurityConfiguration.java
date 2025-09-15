package com.skillstorm.config;

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
//import org.springframework.web.cors.CorsConfiguration;

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
	/* --------USE AS A TEMP until Security Auth is Set in User Microservice-------------
	 
	 
	//quick security customization via a configuration Bean
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		// starting off the process by disabling basic authentication
		http.httpBasic().disable();
		
		// disabling Cross-Site Resource Forgery protection for now
		http.csrf().disable();
		
		// bypassing Cross-Origin Resource Sharing protection for now
		http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(request -> {
	           CorsConfiguration cc = new CorsConfiguration().applyPermitDefaultValues();
	           cc.setAllowedMethods(new LinkedList<>(Arrays.asList("GET", "POST", "PUT", "DELETE")));
	           return cc;
			})
	    );
		
		http.authorizeHttpRequests(requests -> {
			
			// saying whether or not requests of certain methods/endpoints are allowed or denied
			// once a request matches one of these, top-down, the rest are ignored!
			requests.requestMatchers(HttpMethod.GET, "/**").permitAll();
			requests.anyRequest().permitAll();
			
		});
		
		return http.build();
		
	} */ 

