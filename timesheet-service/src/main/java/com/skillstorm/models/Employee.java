package com.skillstorm.models;
/*
`id` INT NOT NULL,
`first_name` VARCHAR(100) NULL,
`last_name` VARCHAR(100) NULL,
`title` VARCHAR(100) NULL,
`pay_rate_per_hour` DECIMAL(10,2) NULL,
`manager_id` INT NULL,
*/

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
 * CREATE TABLE `project_4`.`employee` 
(
  `id` INT NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `title` VARCHAR(100) NULL,
  `pay_rate_per_hour` DECIMAL(10,2) NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `manager_id_1_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `manager_id_1`
    FOREIGN KEY (`manager_id`)
    REFERENCES `project_4`.`manager` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE

 */

@Entity
@Table(name = "employee")
public class Employee {
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
	private Integer managerId;

	public Employee() {
		super();
	}

	public Employee(int id, String firstName, String lastName, String title, BigDecimal payRatePerHour, Integer managerId) {
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

	public Integer getManagerId() {
		return managerId;
	}

	public void setManagerId(Integer managerId) {
		this.managerId = managerId;
	}

}
