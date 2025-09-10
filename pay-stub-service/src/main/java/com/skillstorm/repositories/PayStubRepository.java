package com.skillstorm.repositories;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.PayStub;

import jakarta.transaction.Transactional;

@Repository
public interface PayStubRepository extends CrudRepository< PayStub, Integer>
{

	//method to see all available pay stubs associated to an employee id (Method 1 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM pay_stub WHERE employee_id = ?1", nativeQuery = true)
	Iterable<PayStub> findByEmployeeId(int employeeId);
	
	//method to see all available pay stubs associated to a manager id (Method 2 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM pay_stub WHERE employee_id in ?1", nativeQuery = true)
	Iterable<PayStub> findByManagerId(ArrayList<Integer> employeeList);

	
	//method to see all available pay stubs associated to date match (Method 3 of 3)
	@Transactional
	@Modifying
	@Query(value = "SELECT * FROM pay_stub WHERE date_start = ?1 or date_end = ?1 or pay_stub_date = ?1", nativeQuery = true)
	Iterable<PayStub> findByDate(LocalDate date);
	
}
