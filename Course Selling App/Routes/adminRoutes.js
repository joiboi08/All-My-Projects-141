// defines routes for admins
// refer to readMe
// sign up, sign in, Create new courses, Read db for all courses (publsh + unpublsh), Update course details, Delete a course 

const adminAuthMiddleware = require("../middlewares/adminMid");

// since we define routes, we need express again
const {Router} = require("express");
const router = Router();

// since we make DB calls, we import the schema
const {Admin, Course} = require("../db/dbSchema");

// jwt imports
const jwt = require("jsonwebtoken");
const {jwtkey, jwtKey} = require("../key");

// zod file import 
const {adminSignUpSchema, adminSchema, courseSchema} = require("./zodVal");

//todo: admin sign up
router.post("/signup", async function(req, res) {
// new admin sends entire adminSchema (see dbSchema) in body
const {fullName, username, email, password} = req.body;

//! zod validation of inputs
const response = adminSignUpSchema.safeParse(req.body);
if (!response.success) {
    return res.status(400).json({
        error : "Incorrect input type"
    })
}

// check if this admin already exists in DB
const doesAdminExist = await Admin.findOne({fullName, username, password});
if (doesAdminExist) {
    return res.status(409).json({  //! 409 - conflict in resource state 
        error : "This Admin already exists! Sign in!"
    })
}

// save new admin info to DB
const newAdmin = await Admin.create({
    fullName, username, email, password
})
// return new admin info (for quick update on frontend) as response or return ack as response
console.log(newAdmin);
res.json({
    success : "New Admin successfully created!"
})
})


//todo: admin sign in
router.post("/signin", async function(req, res) {
// pre-existing admin sends username and password in body
const {username, password} = req.body;

//! zod validation of inputs
const response = adminSchema.safeParse(req.body);
if (!response.success) {
    return res.status(400).json({
        error : "Incorrect input type"
    })
}
// check if admin exists in DB
const doesAdminExist = await Admin.findOne({username, password});
if (!doesAdminExist) {
    return res.status(403).json({
        error : "This Admin does not exist. Please sign up."
    })
}
// jwt sign 'username' into a token
const token = jwt.sign({username}, jwtKey);

// return token to admin in response, now admin has to send token in all Course requests   
console.log(token);
res.json({
    token : `Bearer ${token}`
})
})

//todo: create new course
router.post("/newCourse", adminAuthMiddleware, async function(req, res){
// admin sends entire courseSchema
const {courseName, courseDescription, price, imageLink} = req.body;

// admin auth of jwt token sent done by middleware
//! zod validation of course inputs sent by admin
const response = courseSchema.safeParse(req.body);
if (!response.success) {
    return res.status(400).json({
        error : "Incorrect inputs"
    })
}

// create newCourse 
const newCourse = await Course.create({
    courseName, courseDescription, price, imageLink, 
    isPublished : false
})

// log newCourse and return newCourse as resp/ACK as resp
console.log(newCourse);
res.json({
    success : "New Course created!"
})
})

//todo: get all courses
router.get("/allCourses", adminAuthMiddleware, async function(req, res) {
// gets all published and unpublished courses
const allCourses = await Course.find();

res.json({
    allCourses
})
})

//todo: update course details
router.put("/changeCourse", adminAuthMiddleware, async function(req, res) {
// admin sends id of the course to be changed 
const {courseId} = req.body.courseId;
const {courseName, courseDescription, price, imageLink, isPublished} = req.body.updates;
// something like : {
//     courseId : "3524y3513b34",
//     updates : {
//         updatedCourseName : "Web3"
//         etc etc
//     }
// }
let updatedCourse = {};
// const inputs = [courseId, courseName, courseDescription, price, imageLink, isPublished];
// const validInputs = inputs.filter(function(eachInput) {
//     if (!eachInput) {  // removing undefined/blank values
//         return false;
//     }
//     return true;
// })

if (courseName) updatedCourse.courseName = courseName;
if (courseDescription) updatedCourse.courseDescription = courseDescription;
if (price) updatedCourse.price = price;
if (imageLink) updatedCourse.imageLink = imageLink;
if (isPublished) updatedCourse.isPublished = isPublished;




await Course.findByIdAndUpdate(courseId, updatedCourse);
res.json({
    success : "Course updated"
})
})

//todo: delete a course
router.delete("/deleteCourse", adminAuthMiddleware, async function(req, res) {
//  admin sends id of course to delete in body
const {courseId} = req.body;

await Course.findByIdAndDelete(courseId);

res.json({
    success : "Course deleted!"
})

})







