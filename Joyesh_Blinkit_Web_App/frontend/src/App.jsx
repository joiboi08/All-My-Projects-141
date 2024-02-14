import React, {useState} from 'react';
import './App.css';
import { SignInAndSignUp } from './Components/SignInAndSignUp';
import { ImageUpload } from './Components/ImageUpload';




function App() {
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLogInOpen, setLogInOpen] = useState(false);
  
  // if user is logged in or not
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  // will pass these states to backend 
  const [signUpDetails, setSignUpDetails] = useState({
    name : "",
    username : "",
    password : ""
  });
  const [loginDetails, setLoginDetails] = useState({
    username : "",
    password : ""
  })

  function SignUpOpenHandler() {
    setSignUpOpen(true);
  }

  function SignUpCloseHandler() {
    setSignUpOpen(false);
  }

  function LoginOpenHandler() {
    setLogInOpen(true);
  }
  
  function LoginCloseHandler() {
    setLogInOpen(false);
  }
  
  function SignUpChangeHandler(e) {
    // e - event; e.target - DOM element that is source of event
    const {name, value} = e.target;
    setSignUpDetails(function (prevState) {
    const newState = Object.assign({}, prevState); // copying prev state to empty {} to AVOID making DIRECT changes to state variable
    
    newState[name] = value;
    return newState;
    })
  }
  
  // POST req to backend on signup submit
async function SignUpSubmitHandler() {

  try {
    const response = await fetch("http://localhost:3000/signup", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(signUpDetails)
   });
   const data = await response.json();
   if (data.error) {
    alert(data.error);
   return window.location.href = "http://localhost:5173/"; // redirect in case auth fail
  }
   // "/signup" returns the new user as data.newUser
   console.log(data.newUser);
   alert("New User signed up successfully!")
   SignUpCloseHandler(); // close sign up after submit
  } catch (err) {
      console.log(err);
    }
}

  function LoginChangeHandler(e) {
    const {name, value} = e.target;
    console.log(name);
    console.log(value);
    setLoginDetails( function(prevState) {
      const newState = Object.assign({}, prevState);
      newState[name] = value;
      return newState;
    })
  }
  
  // POST req to backend, returns json token
  async function LoginSubmitHandler() {
   try {
    const response = await fetch("http://localhost:3000/signin", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(loginDetails)
    });
    const data = await response.json(); 
    if (data.error) {
      alert(data.error);
    //  return window.location.href = "http://localhost:5173/"; // redirect in case auth fail
    }
    // token is in data.fullToken
    const localToken = data.fullToken;
    localStorage.setItem("jwtAuthToken", localToken);
    
    //! now user is logged in, so set the related state to true
    setUserLoggedIn(true); //* state-var change, so App() rerenders. Conditional rendering activates and renders ImageUpload component instead of signin/signup
    LoginCloseHandler();  // close signin page
   } catch (err) {
    console.log(err);  
   }
  }

  return (
    <div id='parent'>
      {!isUserLoggedIn && <SignInAndSignUp 
      isSignUpOpen={isSignUpOpen}  
      SignUpOpenHandler={SignUpOpenHandler} 
      SignUpCloseHandler={SignUpCloseHandler}
      SignUpChangeHandler={SignUpChangeHandler}
      SignUpSubmitHandler={SignUpSubmitHandler}
      isLogInOpen={isLogInOpen}
      LoginOpenHandler={LoginOpenHandler}
      LoginCloseHandler={LoginCloseHandler}
      LoginChangeHandler={LoginChangeHandler}
      LoginSubmitHandler={LoginSubmitHandler}
      />}
      {isUserLoggedIn && <ImageUpload/>}
    </div>
  )
}

export default App
