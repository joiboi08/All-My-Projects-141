const zod = require("zod");

// zod schema for admin
const adminSignUpSchema = zod.object({  // used in sign up
    fullName : zod.string(),
    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6).max(8)
})

const adminSchema = zod.object({  // used in sign in
    username : zod.string(),
    password : zod.string().min(6).max(8)
})

// zod schema for user
const userSignUpSchema = zod.object({  // used for sign up
    fullName : zod.string(),
    username : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(6).max(8)
})

const userSchema = zod.object({     // used in sign in 
    username : zod.string(),
    password : zod.string().min(6).max(8)
})

// zod schema for course
const courseSchema = zod.object({  // used when admin sends new course details in body
    courseName : zod.string(),
    courseDescription : zod.string(),
    price : zod.number(), 
    imageLink : zod.string().url(),
    // isPublished : zod.boolean() - not needed since we will add this in route itself. Is false by default.

})

module.exports = {
    adminSignUpSchema, 
    adminSchema, 
    userSignUpSchema, 
    userSchema, 
    courseSchema
}