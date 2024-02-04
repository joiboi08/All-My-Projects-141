//! we learn about connecting and adding data to ACTUAL D A T A B A S E !!!!

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect(
  "mongodb+srv://donkeykong08:seedhemaut08@thedonkeykongcluster0.v7hxlsj.mongodb.net/ApplicationWithUsersZoo",
);

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

async function userExists(username) {
  // should check in the database
  //! .findOne({username : username, password : password})  ------ async call bcz reading database! 

  const result = await User.findOne({username : username}); 
  
  return result; // T if that username already is taken by someone, F if not
}

async function userCredentialsCheck(username, password) {
  // should check in the database
  //! .findOne({username : username, password : password})  ------ async call bcz reading database! 

  const result = await User.findOne({username : username, password : password}); 
  
  return result; // T if that user exists with these exact properties, F if not
}

app.post("/newUser", async function(req, res) {
  // creates a new user using given headers 
  //todo: zod validation of inputs everywhere 


  try { 
    // const {theirName, theirUsername, theirPassword} = req.body;   //? object destructuring! cool!
    const theirName = req.body.name;
    const theirUsername = req.body.username;
    const theirPassword = req.body.password; 
    
    console.log(theirName);
    
   // username already exists check

   let doesUserAlreadyExist = await userExists(theirUsername); 

   //! cannot be put in if directly because it returns a promise and if will pass on value before database is read
   //! so final value passed on will be NULL 


   if (doesUserAlreadyExist) {
     return res.status(403).json({
      Error : "That username is taken!"
    });
   }

    //todo: zod validation and error handling
    // hee hee 
    //todo: zod validation and error handling
  
    // create a new entry in db
    const newUser = new User({
    name : theirName,
    username : theirUsername,
    password : theirPassword
    })

    newUser.save(); //* new user is now added 
    
    console.log("New user created!");
    res.json({success : "New user added! Please use the /signin page to sign in and get your token. Send that token as a header to /users to see all other users!"});
  
  } catch (err) {
      res.status(403).json({
        Error : "Some error has occurred!"
      })
  } 

})



app.post("/signin", async function (req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  
  let doesUserAlreadyExist = await userExists(username);
  let userCredsCheck = await userCredentialsCheck(username, password);

  if (!doesUserAlreadyExist) {
    return res.status(403).json({
      Error : "User doesn't exist in our in memory db"
    });
  }
  else if (!userCredsCheck) {
    return res.status(403).json({
      Error : "Incorrect credentials!"
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);

  console.log("Token generated for user : "+name);
  return res.json({
    token
  });
});



app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const sentUsername = decoded.username;
    // return a list of users other than this username from the database
    //! use Users.find to read database acc to the conditions set in it. It basically takes the inputs and creates a custom query that, when executed using .exec() or await in an async func, queries the database to return the exact documents (ie objects we've added) we need.
    
    const otherUsers = await User.find({username : {$ne : sentUsername}});    
    //! $ne means not equals  
    //! so {$ne : sentUsername} means an object that is not equal to sentUsername
    //* Hence Users.find() will return all documents/objects that are NOT equal to sentUsername

    res.json({otherUsers});




  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on PORT 3000!");
});