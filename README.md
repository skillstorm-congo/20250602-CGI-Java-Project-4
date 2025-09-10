
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

      - quiz-api
         - Folder containing all Java Spring Boot files
      
       
      - quiz-frontend
          - Folder containing all React files
      
            
      - ER_Diagram_20250816.png
         - Image of Entitiy Relationship Diagram
      
           
      - Quizzes API.postman_collection.json
         - JSON file of REST API Endpoints in Postman
      
           
      - quizzes_schema.sql
         - mysql file for quiz database and table creation
      
           
      - quizzes_data.sql
         - mysql file of data insertion into each table in the quiz database
      
           
      - quizzes_test_queries.sql
         - mysql file for mysql queries sanity checks
      
           
      - README.md

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
14 Endpoints
  + <details>
      <summary>GET/results</summary>
      &emsp;Objective: See all results<br>
      &emsp;Input(s): n/a<br>
      &emsp;Output(s): Returns all results <br>
      &emsp;Table(s): result
    </details>

  + <details>
    <summary>GET/results/{id}</summary>
    &emsp;Objective: See a result by result id<br>
    &emsp;Input(s): parameter -> location <br>
    &emsp;&emsp;&emsp;&emsp;&emsp;result id -> url parameter <br>
    &emsp;Output(s): Returns a result by result id <br>
    &emsp;Table(s): result
  </details>
  
  + <details>
    <summary>GET/results/?quizId={quizid}</summary>
    &emsp;Objective: See all results by quiz id<br>
    &emsp;Input(s): parameter -> location <br>
    &emsp;&emsp;&emsp;&emsp;&emsp; quizId -> Query Params Key <br>
    &emsp;&emsp;&emsp;&emsp;&emsp; quiz id -> Query Params Value <br>
    &emsp;Output(s): Returns all results by quiz id<br>
    &emsp;Table(s): result
  </details>

  + <details>
      <summary>GET/answers</summary>
      &emsp;Objective: See all answers<br>
      &emsp;Input(s): n/a<br>
      &emsp;Output(s): Returns all answers <br>
      &emsp;Table(s): answer
    </details>

  + <details>
    <summary>GET/answers/{id}</summary>
    &emsp;Objective: See a answer by answer id<br>
    &emsp;Input(s): parameter -> location <br>
    &emsp;&emsp;&emsp;&emsp;&emsp;answer id -> url parameter <br>
    &emsp;Output(s): Returns an answer by answer id <br>
    &emsp;Table(s): answer
  </details>
  
  + <details>
    <summary>GET/answers/?questionId={questionId}</summary>
    &emsp;Objective: See all answers by question Id<br>
    &emsp;Input(s): parameter -> location <br>
    &emsp;&emsp;&emsp;&emsp;&emsp; questionId -> Query Params Key <br>
    &emsp;&emsp;&emsp;&emsp;&emsp; question id -> Query Params Value <br>
    &emsp;Output(s): Returns all answers by question id<br>
    &emsp;Table(s): answer
  </details>

  + <details>
      <summary>POST/answers/submit</summary>
      &emsp;Objective: Submit user answers and retrieve result<br>
      &emsp;Input(s): Quiz Object in JSON Body<br>
      &emsp;Output(s): Returns results <br>
      &emsp;Table(s): quiz
    </details>

  + <details>
      <summary>GET/quizzes</summary>
      &emsp;Objective: See all of the quizzes<br>
      &emsp;Input(s): none
      &emsp;Output(s): Returns the data from the table for all quizzes<br>
      &emsp;Table(s): quiz
    </details>
    
  + <details>
      <summary>GET/quizzes?quiz={id}</summary>
      &emsp;Objective: See a quiz by entering the id<br>
      &emsp;Input(s): parameter -> location
      &emsp;Output(s): Returns the quiz object by it's id <br>
      &emsp;Table(s): quiz
    </details>
    
  + <details>
      <summary>GET/quizzes?subject={subject}</summary>
      &emsp;Objective: See quizzes based on their subject type<br>
      &emsp;Input(s): parameter -> location
      &emsp;Output(s): Returns the quizzes that have a specific subject type <br>
      &emsp;Table(s): quiz
    </details>
    
  + <details>
      <summary>GET/questions</summary>
      &emsp;Objective: See all of the questions<br>
      &emsp;Input(s): none
      &emsp;Output(s): Returns the data from the table for all questions<br>
      &emsp;Table(s): question
    </details>
    
  + <details>
      <summary>GET/questions?question={id}</summary>
      &emsp;Objective: See the specific question by their id<br>
      &emsp;Input(s): parameter -> location
      &emsp;Output(s): Returns the data from the table about that specific question<br>
      &emsp;Table(s): question
  </details>
  
  + <details>
      <summary>GET/questions?quiz={quizId}</summary>
      &emsp;Objective: See all of the questions that are connected to a specific quiz's id<br>
      &emsp;Input(s): parameter -> location
      &emsp;Output(s): Returns the data from the table for all questions that share the same quiz id<br>
      &emsp;Table(s): question
    </details>

  + <details>
      <summary>GET/questions/random?quiz={quizId}</summary>
      &emsp;Objective: See all of the questions in random order for a specific quiz's id<br>
      &emsp;Input(s): parameter -> location
      &emsp;Output(s): Returns the data from the table for all questions into a list but in random order<br>
      &emsp;Table(s): question
     </details>
  
<!-- End of Endpoints -->


<hr>




