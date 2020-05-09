import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTodo(props) {
  /* Hooks */
  const [todo_description, set_todo_description] = useState('');
  const [todo_responsible, set_todo_responsible] = useState('');
  const [todo_priority, set_todo_priority] = useState('');
  const [todo_completed, set_todo_completed] = useState(false);

  /* Functions */
  const onChangeTodoDescription = e => set_todo_description(e.target.value);
  const onChangeTodoResponsible = e => set_todo_responsible(e.target.value);
  const onChangeTodoPriority = e => set_todo_priority(e.target.value);

  const onSubmit = e => {
    e.preventDefault();

    console.log('Form submitted:');
    console.log(`Todo Description: ${todo_description}`);
    console.log(`Todo Responsible: ${todo_responsible}`);
    console.log(`Todo Priority: ${todo_priority}`);
    console.log(`Todo Completed: ${todo_completed}`);

    /* Sending data to the back-end */
    const newData = {
      todo_description: todo_description,
      todo_responsible: todo_responsible,
      todo_priority: todo_priority,
      todo_completed: todo_completed
    }

    axios.post('http://localhost:5000/todos/add', newData)
      .then(res => console.log(res.data));
    /* End of sending data */

    set_todo_description('');
    set_todo_responsible('');
    set_todo_priority('');
    set_todo_completed(false);
  }

  return (
    <div style={{ marginTop: 10 }}>

      <h3>Create New Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todo_description}
            onChange={onChangeTodoDescription}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            value={todo_responsible}
            onChange={onChangeTodoResponsible}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={todo_priority === 'Low'}
              onChange={onChangeTodoPriority}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={todo_priority === 'Medium'}
              onChange={onChangeTodoPriority}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={todo_priority === 'High'}
              onChange={onChangeTodoPriority}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Crete Todo" className="btn btn-primary" />
        </div>
      </form>

    </div>
  )
}