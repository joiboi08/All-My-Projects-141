import { Dialog } from "./Dialog";


export function SignInAndSignUp({
    isSignUpOpen, isLogInOpen, SignUpOpenHandler, LoginOpenHandler, SignUpCloseHandler, LoginCloseHandler, SignUpChangeHandler, LoginChangeHandler, SignUpSubmitHandler, LoginSubmitHandler
}) {
    

    return (
        <div id='child'>
       <div id='text'>
        Hi there.
       </div>
       <button onClick={SignUpOpenHandler}>Sign up!</button>
       <button onClick={LoginOpenHandler}>Log in!</button>

       <Dialog isOpen={isSignUpOpen} onClose={SignUpCloseHandler} title={"Sign Up!"}>
       <input style={{margin : "5px", fontFamily : "sans-serif"}} type="text" placeholder="Enter Name" name="name" onChange={SignUpChangeHandler}/>
       <input style={{margin : "5px", fontFamily : "sans-serif"}} type="text" placeholder="Enter Username" name="username" onChange={SignUpChangeHandler}/>
       <input style={{margin : "5px", fontFamily : "sans-serif"}} type="password" placeholder="Enter password" name="password" onChange={SignUpChangeHandler}/>
       <button onClick={SignUpSubmitHandler}>Sign up</button>
       </Dialog>

       <Dialog isOpen={isLogInOpen} onClose={LoginCloseHandler} title={"Log in!"}>
        <input style={{margin : "5px", fontFamily : "sans-serif"}} type="text" placeholder="Enter username" name="username" onChange={LoginChangeHandler}/>
        <input style={{margin : "5px", fontFamily : "sans-serif"}} type="password" placeholder="Enter password" name="password" onChange={LoginChangeHandler}/>
        <button onClick={LoginSubmitHandler}>Log in</button>
       </Dialog>
      </div>
    )
}