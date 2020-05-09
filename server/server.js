/* Set up */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./database/db-connection.js');
const Router = require('./routes/todo.routes.js');

const app = express();

const colors = require('colors');
const PORT = process.env.PORT || 5000;

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

/* Routes */
app.get('/', (req, res) => {
  res.send('Hello from Express.js');
});

app.use('/todos', Router);

/* Server */
app.listen(PORT, () => {
  console.log(`[Node.js] server on port: ${PORT} \u2713 `.bgBrightBlue);
});