package com.project.expenseManager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.expenseManager.entity.CustomExpenseType;
import com.project.expenseManager.repository.CustomExpenseTypeRepository;

@Controller
@RequestMapping("/types")
public class CustomExpenseTypeController {
	
	@Autowired
	private CustomExpenseTypeRepository customExpenseTypeRepository;

	@GetMapping("/{email}")
	public ResponseEntity<List<CustomExpenseType>> getCustomExpenseTypesofUser(@PathVariable String email) {
		List<CustomExpenseType> types =customExpenseTypeRepository.findByEmailOrEmail(email, "DEFAULT");
		return ResponseEntity.ok(types);
	}
	
	
	@PostMapping
	public ResponseEntity<?> addNewType(@RequestBody CustomExpenseType type) {
		CustomExpenseType saved =customExpenseTypeRepository.save(type);
		return ResponseEntity.ok(saved);
	}
	
}
