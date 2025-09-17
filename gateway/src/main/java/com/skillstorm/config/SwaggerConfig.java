package com.skillstorm.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;

@OpenAPIDefinition
@Configuration
public class SwaggerConfig 
{
	
	@Bean
	RouteLocator routeLocator(RouteLocatorBuilder builder) 
	{
		return builder.routes().route((route) -> route.path("/time-off/v3/api-docs").and().method(HttpMethod.GET).uri("lb://time-off-service"))
								.route((route) -> route.path("/pay-stub/v3/api-docs").and().method(HttpMethod.GET).uri("lb://pay-stub-service"))
								.route((route) -> route.path("/timesheet/v3/api-docs").and().method(HttpMethod.GET).uri("lb://timesheet-service"))
								.route((route) -> route.path("/employee/v3/api-docs").and().method(HttpMethod.GET).uri("lb://employee-service"))
								.route((route) -> route.path("/user/v3/api-docs").and().method(HttpMethod.GET).uri("lb://user-service"))
								.build();
		
	}

}
