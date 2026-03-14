package com.project.expenseManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.expenseManager.entity.CustomExpenseType;
import java.util.List;

public interface CustomExpenseTypeRepository extends JpaRepository<CustomExpenseType,Long>{

	 List<CustomExpenseType> findByEmailOrEmail(String Email,String defaultEmail);
}
