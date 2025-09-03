const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"

mongoose.connect(MONGODB_URI)
.then(()=>{
console.log("Checking connection with DB")
}).catch(()=>{
    console.log(error)
})

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", (req, res)=>{
    
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created
    })  
    .then (()=>{
        res.status(201).send("Recipe created")
    }).catch((error)=>{
        res.status(500).send("Algo ha ido mal")
        console.log(error)
    })
})

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get ("/recipes", (req, res)=>{
    Recipe.find()
    .then((response)=>{
        //res.status(201).send("Testing GET")
        
        res.status(201).json(response)
    }).catch((error)=>{
        res.status(500).send("Mal")
        console.log(error)
    })
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get ("/recipes/:id", async (req, res)=> {
    console.log(req.params)
    try {
        const response = await Recipe.findById(req.params.id)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send("Error getting a single recipe")
        console.log(error)
    }
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put ("/recipes/:id", async(req, res)=> {
    try {
        const response = await Recipe.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send ("Error updating a single recipe")
        console.log(error)
    }
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete ("/recipes/:id", async (req, res)=> {
    try {
        const response = await Recipe.findByIdAndDelete(req.params.id)
        res.status(204).json(response)
    } catch (error) {
        res.status(500).send ("Error deleting a recipe")
        console.log(error)
    }
})



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
