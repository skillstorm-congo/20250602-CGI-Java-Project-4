package com.skillstorm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository <Employee, Integer>
{

}
