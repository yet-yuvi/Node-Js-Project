const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Parse request of content-type: application/json
app.use(bodyParser.json());

// Define a simple rout
app.get('/', (req, res) => {
    res.json({message: 'welcome to my application'});
})

let users = [];
let lastId = 0;

// Create a user
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = ++lastId;
    users.push(user);  // users global array
    res.json(user);
})

// Retrive all users
app.get('/users',(req, res) => {
    res.json(users);  // users global array
})

// Retrive one users
app.get('/users/:ID',(req, res) => {
    const id = req.params.ID;
    const user = users.find((u) => u.id == id);

    if(user) {
        res.json(user);
    }
    else {
        res.status(404).json({message: "User not found"});
    }
    
})

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})