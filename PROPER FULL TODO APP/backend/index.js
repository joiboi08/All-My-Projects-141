// simple todo app backend

const express = require("express");
const cors = require("cors");
const app = express();


const {createTodoSchema, todoIdSchema}  = require("./types");
const { todoMaker } = require("./db");


app.use(express.json());
// app.use(cors());   // allows backend to be hit by ANY frontend port 
app.use(cors());

app.get("/todos", async function(req, res) {
// gets all todos
try {
    
    const allTodos = await todoMaker.find();
    
    res.json({allTodos});
    
} catch (err) {
   
    res.status(411).json({
        error : "Database is not reachable right now" 
    })

}

//! res.json({allTodos}); -- TO BE IN try BLOCK AS WELL SINCE try LIMITS THE SCOPE OF VARIABLES !



})

app.post("/todos/new", async function(req, res) {
// create new todo
const newTodo = req.body;
const todoPayload = createTodoSchema.safeParse(req.body);

if (!todoPayload.success) {
    return res.status(411).json({
        error : "Wrong inputs!"
    })
}

// send to mongo
try {
    const latestTodo = await todoMaker.create({

    title : newTodo.title,
    description : newTodo.description,
    completed : false

})

res.json({
    // success : "New Todo created!"
    // instead, return the NEW todo as response, which can then be used by frontend to update UI
    latestTodo
})
} catch(err) {

    console.log(err);
    res.status(411).json({
        error : "Database is not reachable right now"
    })
}



})

app.put("/complete", async function(req, res) {
// update a todo status to "done!"
// const todoId = parseInt(todoIdSchema.safeParse(req.params.todoId)); - it is right but will user clicking updateTodo will send data thru query or body?
//! we received todo Id thru obj in body and we change that todo to "Done!"
const idPayload = req.body;
const payload = todoIdSchema.safeParse(req.body);

if (!payload.success) {
    return res.status(411).json({
        error : "Wrong inputs!"
    })
}

// logic to mark todo as complete
await todoMaker.updateOne({
    _id : idPayload.todoId  
}, {
    completed : true
})

const updatedTodo = await todoMaker.findById(idPayload.todoId);
res.json({
    // success : "Todo updated!"
    // instead, return the UPDATED todo as response, which can then be used by frontend to update UI
    updatedTodo
})

})

app.delete("/delete", async function(req, res) {
// remove a todo
// user will send todo id in body in obj

const idPayload = req.body;
const payload = todoIdSchema.safeParse(req.body);

if (!payload.success) {
    return res.status(411).json({
        error : "Wrong inputs!"
    })
}

// logic to delete the corresponding todo
await todoMaker.findByIdAndDelete(idPayload.todoId);

res.json({
    success : "Todo deleted!"
})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}` );
})