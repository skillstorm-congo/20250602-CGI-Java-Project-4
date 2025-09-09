package com.skillstorm.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Timesheet;

import org.springframework.data.repository.query.Param;

@Repository
public interface TimesheetRepository extends CrudRepository<Timesheet, Integer> {
	
	//getting a list of time sheets for an employee
	List<Timesheet> findByEmployeeId(Integer employeeId);
	
	// Filter by manager via join to employee table
	  @Query(value = """
	      SELECT t.* FROM time_sheet t
	      JOIN employee e ON e.id = t.employee_id
	      WHERE e.manager_id = :managerId
	      """, nativeQuery = true)
	  List<Timesheet> findByManagerId(@Param("managerId") Integer managerId);

	  @Query("SELECT t FROM Timesheet t WHERE t.dateStart >= :start AND t.dateEnd <= :end")
	  List<Timesheet> findByDateRange(@Param("start") LocalDate start,
	                                  @Param("end") LocalDate end);
}
