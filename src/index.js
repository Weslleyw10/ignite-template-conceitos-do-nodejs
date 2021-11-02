const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  const user = users.find(user => user.username === username)

  if(!user) {
    return response.status(400).json({error: true, message: "Username not exists."})
  }

  request.username = username
  return next()

}

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const verifyIfAlreadyExistsUser = users.some(user => user.username === username);

  if (verifyIfAlreadyExistsUser) {
    return response.status(400).json('Username already exists.')
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user);
  response.json(user)

});

app.get('/users', (request, response) => {
  response.json(users)
})

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request
  const user = users.find(user => user.username === username)
  response.json(user)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request
  const { title, deadline } = request.body
  const user = users.find(user => user.username === username)

  const todo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline),
    done: false,    
    created_at: new Date()
  }

  user.todos.push(todo)
  response.json(todo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const { username } = request
  const { id } = request.params
  const { title, deadline } = request.body

  const user = users.find(user => user.username === username)
  const todo = user.todos.find(todo => todo.id === id)

  if(!todo) {
    return response.status(400).json({ error: true, message: "Todo not found."})
  }

  todo.title = title,
  todo.deadline = new Date(deadline)
  response.json(todo)
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const { username } = request
  const { id } = request.params

  const user = users.find(user => user.username === username)
  const todo = user.todos.find(todo => todo.id === id)

  if(!todo) {
    return response.status(400).json({ error: true, message: "Todo not found."})
  }

  todo.done = true

  response.json(user)

});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
    const { username } = request
    const { id } = request.params

    const user = users.find(user => user.username === username)
    const todo = user.todos.find(todo => todo.id === id)

    if(!todo) {
      return response.status(400).json({ error: true, message: "Todo not found."})  
    }

    user.todos.splice(todo.id, 1)

    response.json("Todo deleted successfully.")

});

module.exports = app;