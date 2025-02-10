# Library Management System

---

## Overview
A full-stack web application for managing books, authors and departments using **Spring Boot** (Backend) and **React.js** (Frontend). This system allows users to search, filter and manage books and authors efficiently with pagination, sorting and authentication.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)

  ## Features
  - Real-time search and filtering departments and books.
  - Managing books and authors with pagination and sorting.
  - Role-based authentication (Admin, Librarian).
 
  ## Technologies Used
  - **Backend**: Java, Spring Boot, Spring Security, JPA and MySQL database.
  - **Frontend**: React.js, React Router, Axios and Bootstrap CSS.
  - **Tools**: JWT Authentication and Lombok.
 
  ## Installation

  ### Backend (Spring Boot)
  - Clone the repository
  ```
  git clone https://github.com/dogovicky/library-management
  ```
  - Navigate to backend folder.
  ```
  cd Backend
  ```
  - Configure your application.properties.
  ```
  spring.datasource.url=jdbc:mysql://localhost:3306/library_system
  spring.datasource.username=mysql
  spring.datasource.password=yourpassword
  ```
  - Run the application
  ```
  mvn spring-boot:run
  ```

  ### Frontend (React.js)
  - Navigate to frontend folder.
  ```
  cd Frontend
  ```
  - Install dependencies
  ```
  npm install
  ```
  - Start the react app.
  ```
  npm run dev
  ```

  ## API Endpoints

  ### Departments
  - **GET /departments**: Fetch all departments (With pagination and sorting).
  - **GET /departments/{departmentId}**: Fetch a single department and respective books (With pagination).
  - **POST /departments**: Add a new department.
  - **POST /departments/{departmentID}/add-new-book**: Add a new book in the respective department.
  - **PUT /departments/{departmentId}**: Update a department.
  - **DELETE /departments/{departmentId}**: Delete a department.

  
 
