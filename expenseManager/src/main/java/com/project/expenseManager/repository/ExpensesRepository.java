package com.project.expenseManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.expenseManager.entity.Expenses;

public interface ExpensesRepository extends JpaRepository<Expenses, Long>{

	public List<Expenses> findExpensesByEmail(String Email);
}
