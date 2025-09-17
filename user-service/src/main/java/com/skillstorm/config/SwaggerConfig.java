package com.skillstorm.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class SwaggerConfig 
{
	@Bean
	GroupedOpenApi swaggerAPI() 
	{
		
		return GroupedOpenApi.builder().group("public").pathsToMatch("/**").build();
	}
	

}
