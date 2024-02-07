// initializes mongoDB, defines different table schema, exports them 
const mongo = require("mongoose"); 

mongo.connect("mongodb+srv://donkeykong08:seedhemaut08@thedonkeykongcluster0.v7hxlsj.mongodb.net/COURSE_APP_BACKEND");

const AdminSchema = new mongo.Schema({
    fullName: String,
    username: String,
    email   : String,
    password: String // Constraints: min 6 chars, max 8 chars
});

const UserSchema = new mongo.Schema({
    fullName: String,
    username: String,
    email  : String,
    password: String,
    "purchasedCourses" : [{
    // this is to be an array of object Ids 
    type : mongo.Schema.Types.ObjectId,  // declared object to be of type ObjectId
    ref : "Course"   // this to hold objectIds of objects of this table
  }]
})

const CourseSchema = new mongo.Schema({
    courseName : String,
    courseDescription : String,
    price : Number, 
    imageLink : String,
    isPublished : Boolean
})

// creating tables in DB
const Admin = mongo.model("Admins Table", AdminSchema); 
const User = mongo.model("Users Table", UserSchema);
const Course = mongo.model("Courses Table", CourseSchema);



module.exports = {
    Admin, 
    User,
    Course
}

