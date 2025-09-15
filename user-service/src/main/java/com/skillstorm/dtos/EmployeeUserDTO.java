package com.skillstorm.dtos;

public record EmployeeUserDTO(int id, int employeeId, String username, String role) {
	//don't return the password

}
