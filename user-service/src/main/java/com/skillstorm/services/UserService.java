package com.skillstorm.services;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skillstorm.dtos.EmployeeUserDTO;
import com.skillstorm.models.User;
import com.skillstorm.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService{
	
	private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found."));

       return user;
    }

    public void register(User user) {

        // first check if username is already in use
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser.isPresent()) {
            // username is already taken
            throw new RuntimeException("Username is already taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));   // encoding the user's password
        user.setRole("USER");       // sets the user's role to the default level of access

        userRepository.save(user);
    }

    // registers a new user as an Admin
    public void registerAdmin(User user) {

        // first check if username is already in use
        Optional<User> foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser.isPresent()) {
            // username is already taken
            throw new RuntimeException("Username is already taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));   // encoding the user's password
        user.setRole("ADMIN");       // sets the user's role to the default level of access

        userRepository.save(user);
    }
}
