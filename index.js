const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

// Use the MongoDB Atlas connection string from the environment variable
const mongoURI = "mongodb+srv://deviljai1999:jU2QGQ0Lrph4Gigw@cluster0.al2sted.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/todo";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define routes
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Serve static files from the React build directory
app.use(express.static(path.resolve(__dirname, 'todolist', 'build')));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'todolist', 'build', 'index.html'));
});

// Start the server
app.listen(1000, () => {
  console.log("Server is Running");
});
