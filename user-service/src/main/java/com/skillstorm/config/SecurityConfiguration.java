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
                .requestMatchers("/user/hello-world").permitAll()              // allow ALL requests to /users/hello-world, even without authentication
                .requestMatchers("/user/private").authenticated()              // users MUST be authenticated to access this endpoint
                .requestMatchers("/user/login").authenticated()              
                .requestMatchers("/user/register").permitAll()                 // any new user can register
                .requestMatchers("/user/register/admin").authenticated()       // only an authenticated user can become an admin
                .requestMatchers("/user/employeeUser").authenticated()
                //.requestMatchers(HttpMethod.POST, "/artists").hasAuthority("ROLE_ADMIN")  // does the same as above, but needs the formatted role as spring expects it to be
        )
        
        // tells Spring security to use Basic Authentication instead of formLogin
        .httpBasic(basic -> {})      // sets default configuration 

        // telling spring security to create a session when a request comes in that needs a session (like getting an XSRF-TOKEN)
        .sessionManagement(session -> 
            session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        )

        /**
         * Cross Site Request Forgery (CSRF)
         *  when someone tries to get access to a server with your credentials when you ar already authenticated.
         *  Spring Security auto-blocks any modifying requests (POST, PUT, DELETE) until this is handled
         * 
         * 
         *  Spring uses Synchronizer Token Pattern to verify CSRF tokens
         *      - when you do a GET request, spring will send you an XSRF-TOKEN
         *      - they will be looking for an X-XSRF-TOKEN on subseequent requests
         * 
         *  HttpOnly 
         *      a type of cookie that can only be accessed in HTTP requests
         *      can NEVER be accessed in your browser or in your code
         * 
         *      in your frontend code, you NEED to access this token, and then transform it and send it in future requests
         */
        .csrf((csrf) -> 
            // tells spring security how to send XSRF-TOKEN. it will automatically handle X-XSRF-TOKEN when you send that.
            csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).ignoringRequestMatchers("/users/register")
        );
        // .csrf((csrf) -> 
        //     csrf.disable()
        // );


    return http.build();
	  }
	
	@Bean
	  PasswordEncoder passwordEncoder() {
	    //storing "{password stuff as bcrypt}$2b$..."
	    return new BCryptPasswordEncoder(10);
	  }
}
