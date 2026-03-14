package com.project.expenseManager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.expenseManager.entity.CustomExpenseType;
import com.project.expenseManager.entity.Expenses;
import com.project.expenseManager.repository.CustomExpenseTypeRepository;
import com.project.expenseManager.repository.ExpensesRepository;

@Controller
@RequestMapping("expenses")
public class ExpensesController {
	
	@Autowired
	private ExpensesRepository expensesRepository;
	
	@Autowired
	private CustomExpenseTypeRepository customExpenseTypeRepository;
	
	@PostMapping
	public ResponseEntity<?> addExpense(@RequestBody Expenses expenses) {
		/*CustomExpenseType type = customExpenseTypeRepository.findById(expenses.getExpenseTypeId())
				.orElse(null);
		expenses.setExpenseTypeName(type.getName());*/
		Expenses savedExpense = expensesRepository.save(expenses);
		return ResponseEntity.ok(savedExpense);
	}
	
	@GetMapping("{email}")
	public ResponseEntity<?> getExpense(@PathVariable String email) {
		 List<Expenses>fetchedExpenses = expensesRepository.findExpensesByEmail(email);
		return ResponseEntity.ok(fetchedExpenses);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
		expensesRepository.deleteById(id);
		return ResponseEntity.ok("Expense Deleted");
	}

}
