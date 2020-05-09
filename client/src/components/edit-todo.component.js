import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function EditTodo(props) {
  /* Hooks */
  const [todo_description, set_todo_description] = useState('');
  const [todo_responsible, set_todo_responsible] = useState('');
  const [todo_priority, set_todo_priority] = useState('');
  const [todo_completed, set_todo_completed] = useState(false);

  /* Getting data from the back-end */
  useEffect(() => {
    console.log('hola')
    axios.get('http://localhost:5000/todos/' + props.match.params.id)
      .then(response => {
        set_todo_description(response.data.todo_description);
        set_todo_responsible(response.data.todo_responsible);
        set_todo_priority(response.data.todo_priority);
        set_todo_completed(response.data.todo_completed);
      })
      .catch(error => console.error(error));
  }, []);
  /* End of getting data */

  /* Functions */
  const onChangeTodoDescription = e => set_todo_description(e.target.value);
  const onChangeTodoResponsible = e => set_todo_responsible(e.target.value);
  const onChangeTodoPriority = e => set_todo_priority(e.target.value);
  const onChangeTodoCompleted = () => set_todo_completed(!todo_completed);

  const onSubmit = event => {
    event.preventDefault();
    const obj = {
      todo_description,
      todo_responsible,
      todo_priority,
      todo_completed
    }
    console.log(obj);
    /* Sending data to the back-end */
    axios.post('http://localhost:5000/todos/update/' + props.match.params.id, obj)
      .then(response => console.log(response.data));
    /* End of sending data */
    props.history.push('/')
  }

  return (
    <div>
      <h3>Update Todo</h3>
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
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="completedCheckbox"
              name="completedCheckbox"
              onChange={onChangeTodoCompleted}
              checked={todo_completed}
              value={todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
          <br />
          <div className="form-group">
            <input type="submit" value="Update Todo" className="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>
  )
}