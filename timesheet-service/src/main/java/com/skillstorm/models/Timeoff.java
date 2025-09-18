package com.skillstorm.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/*
  `id` INT NOT NULL,
  `employee_id` INT NULL,
  `fiscal_year_fiscal_week_start` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `fiscal_year_fiscal_week_end` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `date_start` DATE NULL,
  `date_end` DATE NULL,
  `comment` VARCHAR(200) NULL,
  `approved` BOOLEAN NULL,
  `approved_date` DATE NULL,
  `submitted` BOOLEAN NULL,
  `submitted_date` DATE NULL,
 * 
 */

@Entity
@Table(name = "time_off")
public class Timeoff 
{
	
	//table field/properties
	@Id
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "employee_id", nullable = false)
	private int employeeId;

	@Column(name = "fiscal_year_fiscal_week_start", length = 100, insertable = false, updatable = false)
	private String fiscalYearFiscalWeekStart;
	
	@Column(name = "fiscal_year_fiscal_week_end", length = 100, insertable = false, updatable = false)
	private String fiscalYearFiscalWeekEnd;
	
	@Column(name = "date_start", nullable = true)
	private LocalDate dateStart;
	
	@Column(name = "date_end", nullable = true)
	private LocalDate dateEnd;

	@Column(name = "comment", length = 200)
	private String comment;
	
	@Column(name = "approved")
	private Boolean approved;
	
	@Column(name = "approved_date")
	private LocalDate approvedDate;
	
	@Column(name = "submitted")
	private Boolean submitted;
	
	@Column(name = "submitted_date")
	private LocalDate submittedDate;

	public Timeoff() {
		super();
	}

	public Timeoff(int id, int employeeId, LocalDate dateStart, LocalDate dateEnd, String comment, Boolean submitted,
			LocalDate submittedDate) {
		super();
		this.id = id;
		this.employeeId = employeeId;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.comment = comment;
		this.submitted = submitted;
		this.submittedDate = submittedDate;
	}
	
	//constructor used for NOT FOUND TIME OFF RECORD
	public Timeoff(int id) 
	{
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getFiscalYearFiscalWeekStart() {
		return fiscalYearFiscalWeekStart;
	}

	public String getFiscalYearFiscalWeekEnd() {
		return fiscalYearFiscalWeekEnd;
	}

	public LocalDate getDateStart() {
		return dateStart;
	}

	public void setDateStart(LocalDate dateStart) {
		this.dateStart = dateStart;
	}

	public LocalDate getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(LocalDate dateEnd) {
		this.dateEnd = dateEnd;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Boolean getApproved() {
		return approved;
	}

	public void setApproved(Boolean approved) {
		this.approved = approved;
	}

	public LocalDate getApprovedDate() {
		return approvedDate;
	}

	public void setApprovedDate(LocalDate approvedDate) {
		this.approvedDate = approvedDate;
	}

	public Boolean getSubmitted() {
		return submitted;
	}

	public void setSubmitted(Boolean submitted) {
		this.submitted = submitted;
	}

	public LocalDate getSubmittedDate() {
		return submittedDate;
	}

	public void setSubmittedDate(LocalDate submittedDate) {
		this.submittedDate = submittedDate;
	}
	

}

