import { useState } from "react";




export function CreateTodo({addTodo}) {
    //* most optimal way for #problem1 - react query
    //* sub optimal but widely used way, make local states :
 const [localTitle, setTitle] = useState("");
 const [localDescription, setDescription] = useState(""); 

    return (
        <div>
            <input id="tit" type="text" placeholder="Enter Title" onChange={function(e) {
                    setTitle(e.target.value); 
                    //* e.target gives DOM element (here, it is "input") and .value on it gives the input it was given
            
            }}/>
            <br></br>
            <input type="text" placeholder="Enter Description" onChange={function(e) {
                    setDescription(e.target.value); 
            }}/>
            <br></br>

            <button onClick={ async function() {
                // fetch & sends a POST req with title and desc
                //! learn from video
                const res = await fetch("http://localhost:3000/todos/new", {
                    method : "POST",
                    body : JSON.stringify({
                        //title : document.getElementById("tit").innerHTML - NO! because we avoid document.getElement... etc hence we use react. So wat2do? - #problem 1 - see top
                        title : localTitle,
                        description : localDescription,
                        completed : false
                    }), 
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });
                const final = await res.json();
                //* final.latestTodo has the new todo
                const newTodo = final.latestTodo;
                addTodo(newTodo);
                alert("New Todo added!")
                // re-render after adding new todo - but how?
                //* by passing the final.todoNew2 into something that is called by useEffect in App()

                
            }}>Add a Todo</button> 
        </div>
    )
}