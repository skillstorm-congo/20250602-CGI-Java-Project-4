package com.skillstorm.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Employee;

import jakarta.transaction.Transactional;

@Repository
public interface EmployeeRepository extends CrudRepository <Employee, Integer>
{

	//method to see all available pay stubs associated to a manager id (Method 1 of 2)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM employee WHERE manager_id = ?1", nativeQuery = true)
	Iterable<Employee> findByManagerId(int managerId);

	
}
