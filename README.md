
# Project: Employee Timecard Tracking System 

### **Project Objective** 
Create a full-stack web application that will facilitate employee time tracking and management, enabling both employees and managers to efficiently manage work hours and pay stubs.

- Employees will be able to log onto their accounts to view their timesheets, paystubs, log hours and request time off
- Managers, in addition to employee permissions, will be able to view timesheets of all employees, approve or reject timesheets as well as time off requests.
- Permissions under authentication security features will allow employees to only view details and features based on their status.
  
------------------------------------

### **Project Requirements**  

+ <details>
  <summary>Employee Features</summary><br>

      - View Time Sheets
        - Employees can view their own time sheets, detailing their logged hours
    
      - Log Hours
        - Employees can manually add hours they worked
    
      - View Pay Stubs
        - Employees can view their previous pay stubs
    
      - Request Time Off
        - Employees can submit requests for time off

</details>

+ <details>
  <summary>Manager Features</summary><br>

      - View All Time Sheets
        - Managers can view the time sheets of all employees

      - Approve Time Sheets
        - Managers can approve or reject the time sheets submitted by all employees
  
      - Approve Time Off
        - Managers can approve or reject the time-off requests submitted by all employees

</details>

------------------------------------

### **Technical Specifications**  

+ <details>
  <summary>1. Frontend</summary><br>

    - Framework: React
    - UI/UX: Design a user-friendly interface that allows seamless navigation and interaction for both employees and managers

</details>

+ <details>
  <summary>2. Backend</summary><br>

    - Framework: Spring Boot Microservices (minimum 2, plus Gateway and Service Discovery servers)
    - RESTful APIs: Develop RESTful services to handle all client requests, including CRUD operations for time sheets,
                    pay stubs, and time-off requests
    - Spring Security: Basic Auth, Authentication and role-based Authorization

</details>

+ <details>
  <summary>3. Database</summary><br>

    - Engine: MySQL
    - Schema Design: Create a database schema to manage users, time sheets, pay stubs,and time-off requests efficiently

</details>

------------------------------------

### **Development Guidelines** 

+ <details>
  <summary>1. Project Setup</summary><br>
  
    - Version Control: Use Git for version control. Establish a repository on GitHub for collaborative development
    - Branching Strategy: Implement a branching strategy to manage feature development, bug fixes, and releases

</details>

+ <details>
  <summary>2. Task Allocation</summary><br>

    - Divide the project into distinct tasks such as frontend development, backend development, database design, and deployment
    - Assign tasks to group members based on their strengths and areas of interest

</details>

+ <details>
  <summary>3. Code Quality</summary><br>

    - Follow best practices for code quality, including code reviews, consistent naming conventions, and thorough documentation
    - Test the code to ensure the reliability and robustness of the application

</details>

+ <details>
  <summary>4. Communication</summary><br>

    - Hold regular team meetings to discuss progress, challenges, and next steps
    - Use collaborative tools like Slack, Trello, or Microsoft Teams to facilitate communication and project management

</details>

------------------------------------

### **Deliverables** 

+ <details>
  <summary>Click Here</summary><br>
  
      1. Project Plan
         - A detailed project plan outlining the timeline, milestones, and responsibilities
  
      2. Design Documents
         - UI/UX mockups
         - Database schema API specifications
         - API endpoint specifications
    
      3. Source Code
         - Complete source code of the application available in one or more GitHub Repositories
  
      4. Final Presentation
         - A presentation demonstrating the features of the application, the development process, important features in the code itself, and lessons learned

  </details>

------------------------------------

### **Bonus** 
+ <details>
  <summary>Deployment</summary><br>
  
  - Cloud Platform: AWS
  - Cloud Architecture: Deploy the frontend, backend, and database using S3, EC2/Elastic Beanstalk, and RDS

  </details>


------------------------------------


### **Contents in Github Repository** 

+ <details> 
  <summary> Click Here To See List of Files </summary>

      - FRONTEND

        1) employee-frontend
            - Folder containing all React files


      - BACKEND

        1) employee-service
            - Folder containing all Java Spring Boot files for Employee Microservice
    
  
        2) pay-stub-service
            - Folder containing all Java Spring Boot files for Pay Stub Microservice
    
  
        3) time-off-service
            - Folder containing all Java Spring Boot files for Time Off Microservice
    
  
        4) time-sheet-service
            - Folder containing all Java Spring Boot files for Timesheet Microservice
    
  
        5) user-service
            - Folder containing all Java Spring Boot files for User Microservice
    
  
        6) gateway
            - Folder containing all Java Spring Boot files for Gateway
    
    
        7) project-four-eureka-server
            - Folder containing all Java Spring Boot files for Eureka Server
            
      - MYSQL
     
        1) Project 4.postman_collection.json
             - JSON file of REST API Endpoints in Postman
        
             
        2) project_4_schema.sql
             - mysql file for project_4 database and table creation
        
             
        3) project_4_data.sql
             - mysql file of data insertion into each table in the project_4 database
        
             
        4) project_4_queries.sql
             - mysql file for mysql queries sanity checks


      - MISCELLANEOUS

        1) ER_Diagram_20250917.png
            - Image of Entitiy Relationship Diagram
      
        2) README.md

</details>

<hr>

### **Quiz Application/Website**  

This application/website provides hours of fun for all users of any age! You can choose from 6 quizzes to partake in and they range from tea trivia to unicorn personlity. Each quiz is unique as is its answer types and grading/scoring method.

<hr>

<!-- Beginning of project 4 ER image    -->

### **Project 5 Entity Relationship(ER) Diagram**

<details>
<summary>Click Here to See Image | Legend: Crows Feet = Many & 2 Ticks = One </summary>
<img alt="ER_Diagram_20250909.png" src="https://github.com/skillstorm-congo/20250602-CGI-Java-Project-4/blob/main/ER_Diagram_20250909.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 fzFXnm">
</details>

<!-- End of project 4 ER image    -->

<hr>

### **How to Start the Quiz Application/Website**  

Run the following in order:
- MySql Database
- Spring Boot (possibility of installing libraries/dependencies)
- React (possibility of installing libraries/dependencies)

<hr>


### **Application/Website Pages**  

Home Page:
- List of All Quizzes


Quiz Page:
- Information on a selected quiz from the Home Page


Quiz Taking Page:
- Questions & answers for a quiz, originating from Quiz Page
- User will submit quiz here


Quiz Score Page:
- Quiz results from user input, originates from Quiz Taking Page


------------------------------------

<!-- Begining of Endpoints -->
### **Postman Endpoints**  
[Gateway](http://localhost:9000/swagger-ui/index.html)  
*servers must be running

<!-- End of Endpoints -->


<hr>




