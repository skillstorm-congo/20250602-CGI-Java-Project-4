package com.skillstorm.models;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "time_sheet")
public class Timesheet {
	
	//NULL-able in schema, to make sure no misunderstanding wrap it around Integer since objects allow null entries
	
	@Id //primary key, manual and not auto-generated
	@Column(name = "id") 
	private Integer id; 
	
	@Column(name = "employee_id", nullable = false)
	private Integer employeeId;
	
	@Column(name = "fiscal_year_fiscal_week", length=100, insertable = false, updatable = false)
	private String fiscalYearFiscalWeek;
	
	@Column(name = "date_start", nullable = false)
	private LocalDate dateStart;
	
	@Column(name = "date_end", nullable = false)
	private LocalDate dateEnd;
	
	@Column(name = "submitted")
	private Boolean submitted;
	
	@Column(name = "submitted_date")
	private LocalDate submittedDate;
	
	@Column(name = "approved")
	private Boolean approved;
	
	@Column(name = "approved_date")
	private LocalDate approvedDate;
	
	@Column(name = "comment", length = 200)
	private String comment;
	
	@Column(name = "time_off_id")
	private Integer timeOffId;
	
	//regular hours
	@Column(name = "regular_hours_day_1", precision = 10, scale = 2) 
	private BigDecimal regularHoursDay1;
    
	@Column(name = "regular_hours_day_2", precision = 10, scale = 2) 
    private BigDecimal regularHoursDay2;
    
	@Column(name = "regular_hours_day_3", precision = 10, scale = 2) 
    private BigDecimal regularHoursDay3;
    
	@Column(name = "regular_hours_day_4", precision = 10, scale = 2) 
	private BigDecimal regularHoursDay4;
    
	@Column(name = "regular_hours_day_5", precision = 10, scale = 2) 
	private BigDecimal regularHoursDay5;
	
	@Column(name = "total_regular_hours", insertable = false, updatable = false)
	private BigDecimal totalRegularHours;
	
    //overtime
	@Column(name = "overtime_hours_day_1", precision = 10, scale = 2) 
	private BigDecimal overtimeHoursDay1;
    
	@Column(name = "overtime_hours_day_2", precision = 10, scale = 2) 
	private BigDecimal overtimeHoursDay2;
    
	@Column(name = "overtime_hours_day_3", precision = 10, scale = 2) 
	private BigDecimal overtimeHoursDay3;
    
	@Column(name = "overtime_hours_day_4", precision = 10, scale = 2) 
	private BigDecimal overtimeHoursDay4;
    
	@Column(name = "overtime_hours_day_5", precision = 10, scale = 2) 
	private BigDecimal overtimeHoursDay5;
	
	@Column(name = "total_overtime_hours", insertable = false, updatable = false)
    private BigDecimal totalOvertimeHours;

	//time off
    @Column(name = "time_off_hours_day_1", precision = 10, scale = 2) 
    private BigDecimal timeOffHoursDay1;
    
    @Column(name = "time_off_hours_day_2", precision = 10, scale = 2) 
    private BigDecimal timeOffHoursDay2;
    
    @Column(name = "time_off_hours_day_3", precision = 10, scale = 2) 
    private BigDecimal timeOffHoursDay3;
    
    @Column(name = "time_off_hours_day_4", precision = 10, scale = 2) 
    private BigDecimal timeOffHoursDay4;
    
    @Column(name = "time_off_hours_day_5", precision = 10, scale = 2) 
    private BigDecimal timeOffHoursDay5;
    
    @Column(name = "total_time_off_hours", insertable = false, updatable = false)
    private BigDecimal totalTimeOffHours;
    
    public Timesheet() {
    	super();
    }
    
    public Timesheet(
    		int id, 
    		int employeeId, 
    		String fiscalYearFiscalWeek, 
    		LocalDate dateStart, 
    		LocalDate dateEnd, 
    		boolean submitted,
    		LocalDate submittedDate,
    		boolean approved,
    		LocalDate approvedDate,
    		String comment,
    		Integer timeOffId,
    		BigDecimal regularHoursDay1,
    		BigDecimal regularHoursDay2,
    		BigDecimal regularHoursDay3,
    		BigDecimal regularHoursDay4,
    		BigDecimal regularHoursDay5,
    		BigDecimal totalRegularHours,
    		BigDecimal overtimeHoursDay1,
    		BigDecimal overtimeHoursDay2,
    		BigDecimal overtimeHoursDay3,
    		BigDecimal overtimeHoursDay4,
    		BigDecimal overtimeHoursDay5,
    		BigDecimal totalOvertimeHours,
    		BigDecimal timeOffHoursDay1,
    		BigDecimal timeOffHoursDay2,
    		BigDecimal timeOffHoursDay3,
    		BigDecimal timeOffHoursDay4,
    		BigDecimal timeOffHoursDay5,
    		BigDecimal totalTimeOffHours) {
    	
    	super();
    	this.id = id;
    	this.employeeId = employeeId;
    	this.fiscalYearFiscalWeek = fiscalYearFiscalWeek;
    	this.dateStart = dateStart;
    	this.dateEnd = dateEnd;
    	this.submitted = submitted;
    	this.submittedDate = submittedDate;
    	this.approved = approved;
    	this.approvedDate = approvedDate;
    	this.comment = comment;
    	this.timeOffId = timeOffId;
    	this.regularHoursDay1 = regularHoursDay1;
    	this.regularHoursDay2 = regularHoursDay2;
    	this.regularHoursDay3 = regularHoursDay3;
    	this.regularHoursDay4 = regularHoursDay4;
    	this.regularHoursDay5 = regularHoursDay5;
    	this.totalRegularHours = totalRegularHours;
    	this.overtimeHoursDay1 = overtimeHoursDay1;
    	this.overtimeHoursDay2 = overtimeHoursDay2;
    	this.overtimeHoursDay3 = overtimeHoursDay3;
    	this.overtimeHoursDay4 = overtimeHoursDay4;
    	this.overtimeHoursDay5 = overtimeHoursDay5;
    	this.totalOvertimeHours = totalOvertimeHours;
    	this.timeOffHoursDay1 = timeOffHoursDay1;
    	this.timeOffHoursDay2 = timeOffHoursDay2;
    	this.timeOffHoursDay3 = timeOffHoursDay3;
    	this.timeOffHoursDay4 = timeOffHoursDay4;
    	this.timeOffHoursDay5 = timeOffHoursDay5;
    	this.totalTimeOffHours = totalTimeOffHours;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}

	public String getFiscalYearFiscalWeek() {
		return fiscalYearFiscalWeek;
	}

	//public void setFiscalYearFiscalWeek(String fiscalYearFiscalWeek) {
	//	this.fiscalYearFiscalWeek = fiscalYearFiscalWeek;
	//}

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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Integer getTimeOffId() {
		return timeOffId;
	}

	public void setTimeOffId(Integer timeOffId) {
		this.timeOffId = timeOffId;
	}

	public BigDecimal getRegularHoursDay1() {
		return regularHoursDay1;
	}

	public void setRegularHoursDay1(BigDecimal regularHoursDay1) {
		this.regularHoursDay1 = regularHoursDay1;
	}

	public BigDecimal getRegularHoursDay2() {
		return regularHoursDay2;
	}

	public void setRegularHoursDay2(BigDecimal regularHoursDay2) {
		this.regularHoursDay2 = regularHoursDay2;
	}

	public BigDecimal getRegularHoursDay3() {
		return regularHoursDay3;
	}

	public void setRegularHoursDay3(BigDecimal regularHoursDay3) {
		this.regularHoursDay3 = regularHoursDay3;
	}

	public BigDecimal getRegularHoursDay4() {
		return regularHoursDay4;
	}

	public void setRegularHoursDay4(BigDecimal regularHoursDay4) {
		this.regularHoursDay4 = regularHoursDay4;
	}

	public BigDecimal getRegularHoursDay5() {
		return regularHoursDay5;
	}

	public void setRegularHoursDay5(BigDecimal regularHoursDay5) {
		this.regularHoursDay5 = regularHoursDay5;
	}

	public BigDecimal getTotalRegularHours() {
		return totalRegularHours;
	}

	//public void setTotalRegularHours(BigDecimal totalRegularHours) {
	//	this.totalRegularHours = totalRegularHours;
	//}

	public BigDecimal getOvertimeHoursDay1() {
		return overtimeHoursDay1;
	}

	public void setOvertimeHoursDay1(BigDecimal overtimeHoursDay1) {
		this.overtimeHoursDay1 = overtimeHoursDay1;
	}

	public BigDecimal getOvertimeHoursDay2() {
		return overtimeHoursDay2;
	}

	public void setOvertimeHoursDay2(BigDecimal overtimeHoursDay2) {
		this.overtimeHoursDay2 = overtimeHoursDay2;
	}

	public BigDecimal getOvertimeHoursDay3() {
		return overtimeHoursDay3;
	}

	public void setOvertimeHoursDay3(BigDecimal overtimeHoursDay3) {
		this.overtimeHoursDay3 = overtimeHoursDay3;
	}

	public BigDecimal getOvertimeHoursDay4() {
		return overtimeHoursDay4;
	}

	public void setOvertimeHoursDay4(BigDecimal overtimeHoursDay4) {
		this.overtimeHoursDay4 = overtimeHoursDay4;
	}

	public BigDecimal getOvertimeHoursDay5() {
		return overtimeHoursDay5;
	}

	public void setOvertimeHoursDay5(BigDecimal overtimeHoursDay5) {
		this.overtimeHoursDay5 = overtimeHoursDay5;
	}

	public BigDecimal getTotalOvertimeHours() {
		return totalOvertimeHours;
	}

	//public void setTotalOvertimeHours(BigDecimal totalOvertimeHours) {
	//	this.totalOvertimeHours = totalOvertimeHours;
	//}

	public BigDecimal getTimeOffHoursDay1() {
		return timeOffHoursDay1;
	}

	public void setTimeOffHoursDay1(BigDecimal timeOffHoursDay1) {
		this.timeOffHoursDay1 = timeOffHoursDay1;
	}

	public BigDecimal getTimeOffHoursDay2() {
		return timeOffHoursDay2;
	}

	public void setTimeOffHoursDay2(BigDecimal timeOffHoursDay2) {
		this.timeOffHoursDay2 = timeOffHoursDay2;
	}

	public BigDecimal getTimeOffHoursDay3() {
		return timeOffHoursDay3;
	}

	public void setTimeOffHoursDay3(BigDecimal timeOffHoursDay3) {
		this.timeOffHoursDay3 = timeOffHoursDay3;
	}

	public BigDecimal getTimeOffHoursDay4() {
		return timeOffHoursDay4;
	}

	public void setTimeOffHoursDay4(BigDecimal timeOffHoursDay4) {
		this.timeOffHoursDay4 = timeOffHoursDay4;
	}

	public BigDecimal getTimeOffHoursDay5() {
		return timeOffHoursDay5;
	}

	public void setTimeOffHoursDay5(BigDecimal timeOffHoursDay5) {
		this.timeOffHoursDay5 = timeOffHoursDay5;
	}

	public BigDecimal getTotalTimeOffHours() {
		return totalTimeOffHours;
	}

	//public void setTotalTimeOffHours(BigDecimal totalTimeOffHours) {
	//	this.totalTimeOffHours = totalTimeOffHours;
	//}
    

}
