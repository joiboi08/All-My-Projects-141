// defines routes for users
// refer to readMe - sign up, sign in, view all (published) courses, purchase a course, view all purchased courses 
//* imports 
const {Router} = require("express");
const router = Router();
const userAuthMiddleware = require("../middlewares/userMid");
const {User, Course} = require("../db/dbSchema");
const jwt = require("jsonwebtoken");
const {jwtKey} = require("../key");
const {userSignUpSchema, userSchema, courseSchema} = require("./zodVal.js"); // zod schemas

//todo: sign up user
router.post("/signup", async function(req, res) {
    // new user sends entire adminSchema (see dbSchema) in body
    const {fullName, username, email, password} = req.body;
    
    //! zod validation of inputs
    const response = userSignUpSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(400).json({
            error : "Incorrect input type"
        })
    }
    
    // check if this user already exists in DB
    const doesUserExist = await User.findOne({fullName, username, password});
    if (doesUserExist) {
        return res.status(409).json({  //! 409 - conflict in resource state 
            error : "This User already exists! Sign in!"
        })
    }
    
    // save new user info to DB
    const newUser = await User.create({
        fullName, username, email, password
    })
    // return new user info (for quick update on frontend) as response or return ack as response
    console.log(newUser);
    res.json({
        success : "New User successfully created!"
    })
    })
    
    
//todo: user sign in
router.post("/signin", async function(req, res) {
// pre-existing user sends username and password in body
const {username, password} = req.body;
    
//! zod validation of inputs
const response = userSchema.safeParse(req.body);
    if (!response.success) {
        return res.status(400).json({
            error : "Incorrect input type"
        })
    }
    // check if user exists in DB
    const doesUserExist = await User.findOne({username, password});
    if (!doesUserExist) {
        return res.status(403).json({
            error : "This User does not exist. Please sign up."
        })
    }
    // jwt sign 'username' into a token
    const token = jwt.sign({username}, jwtKey);
    
    // return token to user in response, now user has to send token in all Course requests   
    console.log(token);
    res.json({
        token : `Bearer ${token}`
    })
});

//todo: get all courses
    router.get("/allCourses", userAuthMiddleware, async function(req, res) {
    // gets all published courses
    const allCourses = await Course.find({isPublished : true});
    
    res.json({
   allCourses
    })
})

//todo: purchase course 
    router.post("/purchaseCourse", async function(req, res) {
        // user sends courseid of course they want to buy in body
        const {courseId} = req.body;

        // extracting username from authentication header
        const token = req.headers.authorization.split(" ")[1];
        const usernameOfUser = jwt.decode(token, jwtKey); // returns username

        
        await User.findOneAndUpdate({username : usernameOfUser}, {
            "$push" : {
                purchasedCourses : courseId  //pushes this courseId to the array of the user
            }
        })
    })

    res.json({
        success : "Course purchased!"
    })

//todo: view all purchased courses
router.get("/allPurchasedCourses", async function(req, res) {

const token = req.headers.authorization.split(" ")[1];
const usernameOfUser = jwt.decode(token).username;

const buyer = await User.findOne({username : usernameOfUser});

console.log(buyer);
console.log(buyer.purchasedCourses);

const courses1 = await Course.find({
    _id : {
        "$in" : buyer.purchasedCourses
    }
})

res.json({
    allCourses : courses1
})

});






