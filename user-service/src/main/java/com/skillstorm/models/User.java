package com.skillstorm.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
 * CREATE TABLE `project_4`.`user` 
(
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `role` VARCHAR(100) NOT NULL,
  `active_status` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `employee_id_1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `employee_id_1`
    FOREIGN KEY (`employee_id`)
    REFERENCES `project_4`.`employee` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
 */

@Entity
@Table(name = "user")
public class User implements UserDetails{
	
  @Id
  @Column(name = "id", nullable = false)
  private int id;

  @Column(name = "employee_id", nullable = false)
  private int employeeId;

  @Column(name = "username", nullable = false, length = 100)
  private String username;

  @Column(name = "password", nullable = false, length = 100)
  private String password;

  @Column(name = "role", nullable = false, length = 100)
  private String role;

  @Column(name = "active_status", nullable = false)
  private boolean activeStatus;
  
  public User() {}

  public User(String username, String password, String role) {
	  super();
      this.username = username;
      this.password = password;
      this.role = role;
  }
  
  public User(int id, int employeeId, String username, String password, String role, boolean activeStatus) {
	  super();
	  this.id = id;
	  this.employeeId = employeeId;
	  this.username = username;
	  this.password = password;
	  this.role = role;
	  this.activeStatus = activeStatus;
  }

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public int getEmployeeId() {
		return employeeId;
	}
	
	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public boolean isActiveStatus() {
		return activeStatus;
	}
	
	public void setActiveStatus(boolean activeStatus) {
		this.activeStatus = activeStatus;
	}	  
	
	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        /**
         * looking to return a collection (list or set) of any object that extends the GrantedAuthority class
         *      - we will use SimpleGrantedAuthority
         * 
         *      - format roles to be like ROLE_*
         *          - ROLE_ADMIN, ROLE_USER, ROLE_MOD, etc.
         * 
         *          - if lowercase (user, admin) -> role.toUpperCase() would be needed
         */
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role));       
        return authorities;
    }

}
