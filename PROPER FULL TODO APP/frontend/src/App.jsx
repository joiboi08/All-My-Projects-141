import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { useEffect, useState } from 'react' //! useEffect needs to be imported too!



function App() {
  const [todos, setTodos] = useState([]);
  
 
 useEffect (function() {
  fetch("http://localhost:3000/todos")
  .then( async function(res) {          //! making App() async is causing problems. Use this .then() + async-await setup 
    const jsonData = await res.json();
    setTodos(jsonData.allTodos);           // allTodos is what we returned in backend for GET @ "/todos"
  })
 }, []);
//! THE PROBLEM WITH THIS APPROACH IS THAT WHENEVER setTodos is called, App is rendered again because there is a change in state. This calls fetch() again, in turn setTodos is called again, leading to infinite requests. VERY BAD. 
//* soln in CreateTodo.jsx

  function addTodo(newTodo) {
    // newTodo has latest todo submitted by user
    setTodos([...todos, newTodo]);
  }

  return (
    
      <div>
        <CreateTodo addTodo = {addTodo}/>  
        <Todos todos = {todos}></Todos>
      </div>
      
  )
}

// function getAllTodos() {
//   fetch("http://localhost:3000/todos")
//   .then( async function(res) {          //! making App() async is causing problems. Use this .then() + async-await setup 
//     const jsonData = await res.json();
//     setTodos(jsonData.allTodos);           // allTodos is what we returned in backend for GET @ "/todos"
//   })
// }


//! no work this
// export function reRender(props) {
//   fetch("http://localhost:3000/todos")
//   .then( async function(res) {          
//    const jsonData = await res.json();
//    props.setTodos(jsonData.allTodos);           // allTodos is what we returned in backend for GET @ "/todos"
// })
// }

export default App


