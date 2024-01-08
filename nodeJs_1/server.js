require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Parse request of content-type: application/json
app.use(bodyParser.json());

// Connect with mongoDB
connectDB();

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


// Update a user by specfic id
app.put('/users/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const userUpdate = req.body;
    const userIndex = users.findIndex((u) => u.id == id);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userUpdate};
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }


    // I create thit part
    // let users2 =[];
    // let updatedUser;

    // users.forEach((u) => {
    //     if(u.id===id) {
    //         updatedUser ={ ...u, ...userUpdate};
    //         users2.push(updatedUser);
    //     }
    //     else {
    //         users2.push(u); 
    //     }    
    // })

    // users = users2;

    // if(updatedUser) {
    //     res.json(updatedUser);
    // }
    // else {
    //     res.status(404).json({massage: "User not found"});
    // }



    // BongoDev create this part
    //  const userIndex = users.findIndex((u) => u.id == id);
    //  if (userIndex!==-1) {
    //     let user = users[userIndex];
    //     user = { ...user, ...userUpdate, id: id};
    //     res.json(user);
    //  }
    //  else {
    //     res.status(404).json({message: "User not found"});
    //  }
   
})

// Delete a specific user
app.delete('/users/:id',(req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id == id);

    if (userIndex!==-1) {
        users.splice(userIndex, 1);
        res.json(users);
    }
    else {
        res.status(404).json({message: "User not found"});
    }

})


// Start the server
const port = 6000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})