import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Todo = props => (
  <tr>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
    <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
)

export default function TodosList(props) {
  /* Hooks */
  const [todos, setTodos] = useState([]);

  /* Getting data from the back-end */
  useEffect(() => {
    axios.get('http://localhost:5000/todos/')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error(error));
  });
  /* End of getting data */

  /* Functions */
  const todoList = () => {
    return todos.map((current, i) => {
      return <Todo todo={current} key={i} />
    });
  }

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }} >
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList()}
        </tbody>
      </table>
    </div>
  )
}