package com.project.expenseManager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.expenseManager.entity.User;
import com.project.expenseManager.repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;

	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User registered Successfully");
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User existingUser  =userRepository.findByEmail(user.getEmail());
		if(existingUser == null)
			return ResponseEntity.status(404).body("User not found");
		if(passwordEncoder.matches(user.getPassword(), existingUser.getPassword()))
			return  ResponseEntity.ok("Login Successfull");
		else
			return ResponseEntity.status(401).body("Incorrect Password.");
		
	}
	
	
	
}
