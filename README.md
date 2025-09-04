
# Project: Employee Timecard Tracking System 

### **Project Objective** 
Create a full-stack web application that will facilitate employee time tracking and management, enabling both employees and managers to efficiently manage work hours and pay stubs.

- Employees will be able to log onto their accounts to view their timesheets, paystubs, log hours and request time off
- Managers, in addition to employee permissions, will be able to view timesheets of all employees, approve or reject timesheets as well as time off requests.
- Permissions under authentication security features will allow employees to only view details and features based on their status.
  
------------------------------------

### **Project Requirements**  

+ <details>
  <summary>Functional Requirements:</summary><br>
  Frontend:
    
      - A React SPA consisting of at least the following pages:
        - Quiz List Page
          - All available quizzes should be displayed
          - Quizzes will be logically separated into subdivisions based on quiz category (i.e., Math, Science, History, etc.)
          - Basic quiz information should be displayed here (i.e., number of questions, quiz name, etc.)
          - Clicking one of the displayed quizzes will redirect user to the quiz preview page
            
        - Quiz Taking Page
          - Prior to the quiz starting, display a brief description of the quiz, number of questions, and an option to either start the quiz or return to the quiz list page
          - Upon quiz start, show all questions and their possible answers
          - Upon submitting the quiz, the quiz is graded and the user is redirected to a page displaying their score
            
        - Quiz Score Page
          - The total score of the user is displayed on the screen
          - The user has the ability to view the questions answered and see the questions they got wrong
          - Have a button that returns them to the home page when clicked
      
    Backend:
  
          - Data must be stored in a MySQL database
          - Database schema design must logically separate entities such as quiz data and question data
          - Data must be made available to the frontend through a Spring Boot web API
  </details>
  
+ <details>
  <summary>Non-Functional Requirements:</summary><br>
    &emsp;- Well-documented code <br>
    &emsp;- Code uploaded to GitHub prior to project presentation <br>
    &emsp;- Code upholds industry best practices (SOLID/DRY) 
</details>

+ <details>
  <summary>UI/UX Requirements:</summary>
  &emsp;- Website should look and feel professional <br>
  &emsp;- Navigation should be easy and intuitive <br>
  &emsp;- Errors (and successes) should be clearly communicated to the user
</details>

+ <details>
  <summary>Technologies:</summary>
  &emsp;- React — HTML, CSS, TypeScript <br>
  &emsp;- You may optionally use a CSS Framework (Bootstrap, Tailwind, MaterialUI, etc.)<br>
  &emsp;- Spring Boot <br>
  &emsp;- MySQL<br>
 </details>

+ <details> 
  <summary>Bonus Challenges:</summary>
   &emsp;- Deploy your application to AWS  <br>
   &emsp;- Setup a CI/CD pipeline <br>
   &emsp;- Add a timer for quizzes <br>
   &emsp;- Add a section for the user to select related quizzes upon finishing <br>
   &emsp;- Have quizzes with multiple question types (i.e. multiple choice, select multiple, etc.) <br>
   &emsp;- Add user login to save a record of their results <br>
     &emsp; &emsp;- Add a Quiz History page <br>
     &emsp; &emsp;- Indicate on the main page which quizzes they have already taken
</details>
-------------------------------------

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
------------------------------------

### **Quiz Application/Website**  

This application/website provides hours of fun for all users of any age! You can choose from 6 quizzes to partake in and they range from tea trivia to unicorn personlity. Each quiz is unique as is its answer types and grading/scoring method.

<hr>

<!-- Beginning of quiz ER image    -->

### **Quiz Entity Relationship(ER) Diagram**

<details>
<summary>Click Here to See Image | Legend: Crows Feet = Many & 2 Ticks = One </summary>
<img alt="ER_Diagram_20250816.png" src="https://github.com/skillstorm-congo/20250602-CGI-Java-Project-3/blob/main/ER_Diagram_20250816.png?raw=true" data-hpc="true" class="Box-sc-g0xbh4-0 fzFXnm">
</details>


<!-- End of quiz ER image    -->

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

<!-- Begining of Quiz Info -->
### **Quiz Information**  
6 Quizzes
  + <details>
    <summary>Tea Caffeine Knowledge Check</summary>
    &emsp;Quiz ID: 1 <br>
    &emsp;Subject: Health<br>
    &emsp;Description: Understanding how caffeine from tea differs between types and brewing techniques<br>
    &emsp;Number of Questions:  8<br>
    &emsp;Results: Pass or Fail
    </details>

  + <details>
    <summary>Do you know where your cafe imports their tea?</summary>
    &emsp;Quiz ID: 2 <br>
    &emsp;Subject: Industry<br>
    &emsp;Description: Learning about popular beverage chains such as Starbucks, Peets, Tim Hortons, Dutch Bros, etc.<br>
    &emsp;Number of Questions:  10<br>
    &emsp;Results: Pass or Fail
  </details>

  + <details>
     <summary>Tea Etiquette Around the World</summary>
    &emsp;Quiz ID: 3 <br>
    &emsp;Subject: Culture<br>
    &emsp;Description: Exploring customs and traditions of tea drinking from around the world.<br>
    &emsp;Number of Questions:  10<br>
    &emsp;Results: Pass or Fail
    </details>

  + <details>
    <summary>What kind of unicorn are you?</summary>
    &emsp;Quiz ID: 4<br>
    &emsp;Subject: Personality<br>
    &emsp;Description: Find out what kind of magical unicorn is you.<br>
    &emsp;Number of Questions: 5 <br>
    &emsp;Results: winged, white, or black unicorn
  </details>

  + <details>
    <summary>Can you pass an elementary geography test?</summary>
    &emsp;Quiz ID: 5<br>
    &emsp;Subject: Geography<br>
    &emsp;Description: Find out if you have the knowledge to pass an elementary geography test.<br>
    &emsp;Number of Questions: 10 <br>
    &emsp;Results: Pass or Fail
    </details>

  + <details>
    <summary>Are you Mulled Cider or Pumpkin Spiced Latte?</summary>
    &emsp;Quiz ID: 6<br>
    &emsp;Subject: Personality<br>
    &emsp;Description: Find out if you're Mulled Cider or Pumpkin Spiced Latte.<br>
    &emsp;Number of Questions: 5 <br>
    &emsp;Results: Mulled Cider or Pumpkin Spiced Latte
  </details>

<!-- End of Quiz Info -->

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




