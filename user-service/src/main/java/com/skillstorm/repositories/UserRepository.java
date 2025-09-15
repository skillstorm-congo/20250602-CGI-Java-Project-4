package com.skillstorm.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	//allows us to search for users by username
	public Optional<User> findByUsername(String username);
	Optional<User> findByEmployeeId(int employeeId);
}
