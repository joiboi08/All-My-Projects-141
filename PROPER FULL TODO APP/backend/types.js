// zod
const zod = require("zod");

// no zod reqd for get all todos

// zod for creating a new todo - user will send it in body
// {
//     title : String,
//     description : String
// }

const createTodoSchema = zod.object({
        title : zod.string(), 
        description : zod.string()
})

// zod for updating a todo status to "done!" - user will send json obj containing id 


const todoIdSchema = zod.object({
        todoId : zod.string()
});

module.exports = {             // key and value are same so :
        createTodoSchema,
        todoIdSchema 
}