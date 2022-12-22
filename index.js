const express = require('express');
let app = express();
let lastId = 11;
let data = require("./User.js")
// set up a database (we'll use in-memory storage for this example)

app.use(express.json())

// create a new user
app.get('/users', (req, res) => {
    res.send(data);
});


// create a new user
app.post('/users', (req, res) => {
    const user = req.body;
    if (!user.name) return res.status(404).send({ message: 'The field name is required' });
    if (!user.username) return res.status(404).send({ message: 'The field username is required' });
    if (!user.email) return res.status(404).send({ message: 'The field email is required' });
    const createdUser = { id: lastId, name: user.name, username: user.username, email: user.email }
    data.push(createdUser);
    lastId++;
    res.send(createdUser);
});

// read an user
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(404).send({ message: 'The user id is required' });
    const user = data.find(u => u.id == userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: `user with id:  ${userId} not found` });
    }
});

// update an user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(404).send({ message: 'The user id is required' });
    const user = data.find(u => u.id == userId);
    if (user) {
        data[userId] = { ...user, ...req.body };
        res.send(data[userId]);
    } else {
        res.status(404).send({ message: 'user not found' });
    }
});

// delete an user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(404).send({ message: 'The user id is required' });
    const user = data.find(u => u.id == userId);
    if (user) {
        data = data.filter(u => u.id != userId)
        res.send({ message: 'user deleted' });
    } else {
        res.status(404).send({ message: 'user not found' });
    }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
