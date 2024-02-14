# All-My-Projects
Collection of all the projects I made and will make. Welcome!

Right now I only offer files for your perusal but I will soon have them running on servers and let you test/play around! 

# Dynamic Image Upload with SignUp/SignIn Landing Page
Made a small web-app that lets you sign up, sign in using secure password hashing! And then lets you upload an image! Amazing! 

It was my most intense, biggest jump in terms of actual skill => needed skill and (even tho I was looking up half the stuff before writing) it was an incredible learning experience. Makes me feel more confident as dev!

I also hate how little there is "technically" to write in 'Frontend' below but figuring out React, making new components in different files (for that sweet clean look), importing them, troubelshooting for 37mins and realising you forgot to return a function - it all adds up to be more than what is written below. Same for backend but at a lesser intensity because I am getting comfortable in it now. And I will in React too! Thanks for reading, cheerio! 

### Backend 
- Node.js and Express
- used Multer for uploaded file handling
- JWT (jsonwebtoken library) for user authentication
- MongoDB external NoSQL database, queried with Mongoose
- API testing with Postman
- structured, modular file implementation 
- written in JavaScript

### Frontend 
- Dynamic frontend! So React.js
- AVOIDED using external library like Material UI to gain a feel of things, will try next. 
- the idea was instead of linking to different pages we can have React CONDITIONALLY render the needed components according to userLoggenIn status.
- HTML/CSS for making it pretttty.


# Full Stack Todo App With React 
Implemented the Backend and a dynamic Frontend for a simple Todo List App as a learning
project.
### Backend 
- made with Node.js and Express
- written in JavaScript
- using Zod for input validation
- MongoDB as external database to hold todos and queried using Mongoose
- API testing with Postman
- implemented in different files with appropriate exports to improve readability.
### Dynamic Updating Frontend
- implemented using React.js
- utilising useState and useEffect hooks.
- Basic styling with HTML, CSS to make it look civil. Learning more CSS to beautify!


# Course Selling App Backend Implementation 

This document outlines the backend implementation for a Course Selling App, akin to platforms like Udemy. This backend system enables new users to sign up, existing users to sign in using JWT token verification, view all available courses, purchase courses, and view their purchased courses. Additionally, it covers the administrative functionalities, allowing for the management and creation of course content.

## Engaging Entities

- **Admin (New or Existing)**
- **User (New or Existing)**

## Database Tables

- **Admin**
- **User**
- **Courses** 
- **Purchased Courses** 

## Overview

The system is designed to authenticate users and administrators, offering distinct functionalities to each. It ensures secure sign-in mechanisms, comprehensive course management by admins, and an engaging course purchasing and viewing experience for users.

### Admin-Side Features

- **Admin Database Schema**

  ```json
  {
    "fullName": "String",
    "username": "String",
    "email": "String",
    "password": "String" // Constraints: min 6 chars, max 8 chars
  }

**Authentication Middleware**

- Utilizes JSON Web Token (JWT) for verifying admin identities.

### Admin Routes : 
- New Admin Sign-up: /admin/signup
- Existing Admin Sign In
#### Course Creation and Management: 
- Admins can create new courses
- view unpublished courses
- full CRUD (Create, Read, Update, Delete) capabilities over the course content.

### Course Schema 
```json
{
  // no objectId here because that is added by default in MongoDB
  "courseName" : "String",
  "courseDescription" : "String",
  "price" : "Number", 
  "isPublished" : "Boolean"
}
```

### User-Side Features

- **User Database Schema** 
 ```json
 {
  "fullName" : "String",
  "username" : "String",
  "email" : "String",
  "password" : "String",
  "purchasedCourses" : [{}]
 }
```
- Authentication Middleware : Secures user sessions using JWT, ensuring safe sign-in and data access.

### User Routes : 
- New User Sign-up
- Existing User Sign In
- View All Courses: Users can browse through the entire catalog of courses.
- Purchase Courses: Users can purchase courses, which are then added to their profile.
- View Purchased Courses: Users can access their purchased courses at any time.

### Technical Stack
**Validation**
- Input validation is implemented using the Zod library, ensuring data integrity and security.
**Database**
- Utilizes an external MongoDB for data storage, with Mongoose library for data modeling and query management.
**Server**
- Written in JavaScript, ensuring a flexible and dynamic backend structure.
**Modular Design**
- The backend is compartmentalized with a clear export/import structure, enhancing readability and maintainability of the codebase.

This backend implementation offers a Course Selling App, providing both users and admins with a robust set of features to engage with course content effectively and securely.

# User App Backend 
MongoAss stands for Mongo Assignment because that is how it started. 
This is the backend implementation for : 
- new user sign up
- existing user sign in 
- user credential validation 
- token verification using jwt
- zod validation for input headers 
- supports all CRUD operations (route for each operation)!

It is a culmination project for 3-4 weeks of the 100xDevs - Cohort 2. This may not seem like much to seasoned people but it is nice to me since I didn't even know javascript 3 weeks back and thought node.js was a language! Heh! Kudos to Harkirat for a great and accommodating cohort!
