package com.skillstorm.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.models.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	public Optional<User> findByUsername(String username);
}
