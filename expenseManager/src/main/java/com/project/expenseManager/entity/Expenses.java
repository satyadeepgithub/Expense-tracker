package com.project.expenseManager.entity;


import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "expenses")
public class Expenses {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@JsonProperty("typeId")
	@Column(name = "type_id",nullable= false)
	private Long expenseTypeId;
	
	@JsonProperty("typeName")
	@Column(name = "title", nullable = false)
	private String expenseTypeName;
	
	@Column(nullable = false)
	private double amount;
	
	@Column(nullable = false)
	private String email;
	
	@CreationTimestamp
	@Column(name = "created_date")
	private LocalDate dateOfExpense;
	
	
}
