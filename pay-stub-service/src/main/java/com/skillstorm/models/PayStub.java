package com.skillstorm.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
  `id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  `time_sheet_id_1` INT NOT NULL,
  `time_sheet_id_2` INT NULL,
  `time_off_id_1` INT NULL,
  `time_off_id_2` INT NULL,
  `fiscal_week_fiscal_year_start` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_start`, 3)),
  `fiscal_week_fiscal_year_end` VARCHAR(100) GENERATED ALWAYS AS (YEARWEEK(`date_end`, 3)),
  `date_start` DATE NULL,
  `date_end` DATE NULL,
  `pay_stub_date` DATE NULL,
  `total_regular_hours` DECIMAL(10,2) NULL,
  `total_overtime_hours` DECIMAL(10,2) NULL,
  `total_time_off_hours` DECIMAL(10,2) NULL,
  `total_paid` DECIMAL(10,2) NULL,
 */

@Entity
@Table(name = "pay_stub")
public class PayStub 
{
	
	//table field/properties
	@Id
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "employee_id", nullable = false)
	private int employeeId;
	
	@Column(name = "time_sheet_id_1", nullable = false)
	private int timeOffId1;
	
	@Column(name = "time_sheet_id_2", nullable = true)
	private int timeOffId2;
	
	@Column(name = "fiscal_year_fiscal_week_start", length = 100)
	private String fiscalYearFiscalWeekStart;
	
	@Column(name = "fiscal_year_fiscal_week_end", length = 100)
	private String fiscalYearFiscalWeekEnd;
	
	@Column(name = "date_start", nullable = true)
	private LocalDate dateStart;
	
	@Column(name = "date_end", nullable = true)
	private LocalDate dateEnd;
	
	@Column(name = "pay_stub_date", nullable = true)
	private LocalDate payStubDate;
	
	@Column(name = "total_regular_hours", precision = 10, scale = 2)
	private BigDecimal totalRegularHours;
	
	@Column(name = "total_overtime_hours", precision = 10, scale = 2)
	private BigDecimal totalOvertimeHours;
	
	@Column(name = "total_time_off_hours", precision = 10, scale = 2)
	private BigDecimal totalTimeOffHours;
	
	@Column(name = "total_paid", precision = 10, scale = 2)
	private BigDecimal totalPaid;

	//constructors
	public PayStub() {
		super();
	}

	public PayStub(int id, int employeeId, int timeOffId1, int timeOffId2, LocalDate dateStart, LocalDate dateEnd,
			LocalDate payStubDate) {
		super();
		this.id = id;
		this.employeeId = employeeId;
		this.timeOffId1 = timeOffId1;
		this.timeOffId2 = timeOffId2;
		this.dateStart = dateStart;
		this.dateEnd = dateEnd;
		this.payStubDate = payStubDate;
	}
	
	//setters & getters
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

	public int getTimeOffId1() {
		return timeOffId1;
	}

	public void setTimeOffId1(int timeOffId1) {
		this.timeOffId1 = timeOffId1;
	}

	public int getTimeOffId2() {
		return timeOffId2;
	}

	public void setTimeOffId2(int timeOffId2) {
		this.timeOffId2 = timeOffId2;
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

	public LocalDate getPayStubDate() {
		return payStubDate;
	}

	public void setPayStubDate(LocalDate payStubDate) {
		this.payStubDate = payStubDate;
	}

	public BigDecimal getTotalRegularHours() {
		return totalRegularHours;
	}


	public BigDecimal getTotalOvertimeHours() {
		return totalOvertimeHours;
	}


	public BigDecimal getTotalTimeOffHours() {
		return totalTimeOffHours;
	}


	public BigDecimal getTotalPaid() {
		return totalPaid;
	}


}
