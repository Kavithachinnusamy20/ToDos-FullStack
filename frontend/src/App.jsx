
import { useEffect, useRef, useState } from 'react'
import './App.css'
//This is the base URL of your backend server that handles todos.
const BASE_URL = 'http://localhost:8080'

function App() {
//- todos: an array to hold todo items fetched from your server.
//- inputRef: points to your input field so you can grab its value directly without using controlled components.

  const [todos, setTodos] = useState([])
  const inputRef = useRef()
//Fetching Todos from the Server
// Sends a GET request to retrieve all todo items.

  async function getData() {
    try {
      const response = await fetch(BASE_URL + '/todos')
      const data = await response.json()
      setTodos(data)
    } catch (e) {
      console.log(e)
    }
  }
// Initial Data Load with useEffect
//- When the component mounts, getData() runs once.
//- The empty array [] ensures it doesn’t re-run on every render

  useEffect(() => {
    getData()
  }, [])

  console.log('todos: ', todos)
//Submitting a New Todo
  async function handleSubmit(e) {
    e.preventDefault() //- Stops page reload on form submission.
//Grabs text from the input field and wraps it in a todo object
    const todo = {
      text: inputRef.current.value
    }

    const response = await fetch(BASE_URL + '/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const newTodo = await response.json()

    console.log(newTodo)

    setTodos([...todos, newTodo])

    inputRef.current.value = ''
  }
// Deleting a Todo

  async function handleDelete(id) {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE'
    })
    getData()
  }
// Toggling a Todo’s Completed Status

  async function handleComplete(id) {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: 'PUT'
    })
    getData()
  }

// Rendering the U
  return (
    <>
    <div className="container">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map((todo) =>
          <li key={todo._id}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => handleComplete(todo._id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        )}
      </ul>
      </div>
    </>
  )
}

export default App
