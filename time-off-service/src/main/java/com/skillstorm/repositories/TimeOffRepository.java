package com.skillstorm.repositories;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.TimeOff;

import jakarta.transaction.Transactional;

@Repository
public interface TimeOffRepository extends CrudRepository <TimeOff, Integer>
{
	
	//method to see all available time off records associated to an employee id (Method 1 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM time_off WHERE employee_id = ?1", nativeQuery = true)
	Iterable<TimeOff> findByEmployeeId(int employeeId);
	
	//method to see all available time off records associated to a manager id (Method 2 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM time_off WHERE employee_id in ?1", nativeQuery = true)
	Iterable<TimeOff> findByManagerId(ArrayList<Integer> employeeList);
	
	//method to see all available time off records associated to date match (Method 3 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM time_off WHERE date_start = ?1 or date_end = ?1 or approved_date = ?1 or submitted_date = ?1", nativeQuery = true)
	Iterable<TimeOff> findByDate(LocalDate date);
	
}
