package com.skillstorm.project_four_eureka_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
//this annotation is the ONLY thing we need code-wise to make this work as a Eureka server
@EnableEurekaServer
public class ProjectFourEurekaServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectFourEurekaServerApplication.class, args);
	}

}
