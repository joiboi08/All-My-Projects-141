const mongo = require("mongoose");

mongo.connect("mongodb+srv://donkeykong08:seedhemaut08@thedonkeykongcluster0.v7hxlsj.mongodb.net/Todo_APP");

const todoMaker = mongo.model("Todos", {
    title : String,
    description : String,
    completed : Boolean
})
// or you can do : 
// const todoSchema = mongo.Schema({
//     title : String,
//     description : String,
//     completed : Boolean
// })

// const todoMaker = mongo.model("Todos", todoSchema);

module.exports = {
    todoMaker  // this means --> todoMaker : todoMaker
}