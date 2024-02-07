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

This backend implementation offers a comprehensive solution for a Course Selling App, providing both users and admins with a robust set of features to engage with course content effectively and securely.