/* Model */
const Todo = require('../models/todo-models.js');

/* Methods */
getAllItems = (req, res) => {
  Todo.find((error, todos) => {
    return error ? console.error(error) : res.json(todos)
  });
}

getItem = (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (error, item) => {
    return error ? console.error(error) : res.json(item);
  });
}

addItem = (req, res) => {
  const item = new Todo(req.body);
  item.save()
    .then(() => {
      return res.status(200).json({ 'message': 'item added successfully' });
    })
    .catch(error => {
      return res.status(400).send('adding new item failed');
    });
}

updateItem = (req, res) => {
  const id = req.params.id
  const { todo_description, todo_responsible, todo_priority, todo_completed } = req.body;

  Todo.findById(id, (error, item) => {
    if (!item) {
      return res.status(404).send("data is not found");
    } else {
      item.todo_description = todo_description;
      item.todo_responsible = todo_responsible;
      item.todo_priority = todo_priority;
      item.todo_completed = todo_completed;

      item.save()
        .then(() => res.json('Item updated'))
        .catch(error => res.status(400).send('Update not possible'));
    }
  });
}

/* Exports */
module.exports = {
  getAllItems,
  getItem,
  addItem,
  updateItem
}