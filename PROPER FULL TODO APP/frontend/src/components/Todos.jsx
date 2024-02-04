// {todos} directly assumes an object will be passed then we can access directly. 
// equivalent to passing 'props' then accessing with props.todos

// todos is an array of todo objects :
// {
//     title : asdasd,
//     description : asdasd,
//     completed : false
// }

export function Todos({todos}) {


    return (  // returns a div that renders all the todos 
        <div>
            {todos.map(function(eachTodo) {
                return (
                    <div>
                        <h1>{eachTodo.title}</h1>
                        <h2>{eachTodo.description}</h2>
                        <button>{eachTodo.completed == true ? "Completed" : "Mark as Completed"}</button>

                    </div>
                )
            })}
        </div>
    )
}