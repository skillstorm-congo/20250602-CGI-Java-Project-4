package com.skillstorm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient //we need this here again so this app will register itself with the Eureka server
@EnableFeignClients //we need this here to enable service-to-service communication via name as opposed to IPs and RestTemplate
public class TimesheetServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TimesheetServiceApplication.class, args);
	}
    //quick security customization via a configuration Bean
	/*@Bean
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
}
