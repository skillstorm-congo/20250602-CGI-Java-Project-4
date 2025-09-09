package com.skillstorm.models;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
   `id` INT NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  `pay_rate_per_hour` DECIMAL(10,2) NULL,
  `manager_id` INT NULL,
 */

@Entity
@Table(name = "employee")
public class Employee 
{
	
	//table fields/properties
	@Id
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "first_name", length = 100)
	private String firstName;
	
	@Column(name = "last_name", length = 100)
	private String lastName;
	
	@Column(name = "title", length = 100)
	private String title;
	
	@Column(name = "pay_rate_per_hour", precision = 10, scale = 2)
	private BigDecimal payRatePerHour;
	
	@Column(name = "manager_id", nullable = true)
	private int managerId;

	public Employee() {
		super();
	}

	public Employee(int id, String firstName, String lastName, String title, BigDecimal payRatePerHour, int managerId) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.title = title;
		this.payRatePerHour = payRatePerHour;
		this.managerId = managerId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public BigDecimal getPayRatePerHour() {
		return payRatePerHour;
	}

	public void setPayRatePerHour(BigDecimal payRatePerHour) {
		this.payRatePerHour = payRatePerHour;
	}

	public int getManagerId() {
		return managerId;
	}

	public void setManagerId(int managerId) {
		this.managerId = managerId;
	}
	
	

}
