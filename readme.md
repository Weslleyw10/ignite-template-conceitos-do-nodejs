<h1 align="center"><strong>TODO API</strong></h1>

<h4 align="center"> 
	Todo api 🚀 Finished...
</h4>

<br />

### Resources

- [x] Create user
- [x] Middleware user
- [x] List users
- [x] Create todo
- [x] List todos
- [x] Update todo
- [x] Done todo
- [x] Delete todo

<br />

### Requirements

Before starting, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Use an editor of your choice.

<br />

### 🎲 Running

```bash
# Clone this repository
$ git clone <https://github.com/Weslleyw10/ignite-template-conceitos-do-nodejs.git>

# Access the directory this project from the terminal/cmd
$ cd ignite-template-conceitos-do-nodejs

# Install dependencies
$ yarn install

# Run
$ yarn dev

# The server will start on port:8000 - access <http://localhost:8000>
```

<br />

# Endpoints

### User

``` bash
    # create user 
    curl --request POST \
  --url http://127.0.0.1:8000/users \
  --header 'Content-Type: application/json' \
  --data '{"name": "Andre", "username": "andre.gio"}'
```
``` bash
    # list users
    curl --request GET \
  --url http://127.0.0.1:8000/users
```

### Todos

``` bash
    # Create todos
    curl --request POST \
  --url http://127.0.0.1:8000/todos \
  --header 'Content-Type: application/json' \
  --header 'username: andre.gio' \
  --data '{ 	
	"title": "Nome da tarefa",
	"deadline": "2021-11-02"
    }'
```
``` bash
    # List todos
    curl --request GET \
  --url http://127.0.0.1:8000/todos \
  --header 'username: {username}'
```
``` bash
    # Update todo
    curl --request PUT \
  --url http://127.0.0.1:8000/todos/{todoId} \
  --header 'Content-Type: application/json' \
  --header 'username: {username}' \
  --data '{ 	
	"title": "Nome da tarefa",
	"deadline": "2021-11-03"
    }'
```
``` bash
    # Complete todo
    curl --request PATCH \
  --url http://127.0.0.1:8000/todos/{todoId}/done \
  --header 'username: {username}'
```
``` bash
    # Delete todo
    curl --request DELETE \
  --url http://127.0.0.1:8000/todos/{todoId} \
  --header 'username: {username}'
```