const express = require('express');

/* Controller */
const TodoCtrl = require('../controllers/todo-ctrl.js');

/* Router */
const router = express.Router();

/* Routes */
router.get('/', TodoCtrl.getAllItems);
router.get('/:id', TodoCtrl.getItem);
router.post('/add', TodoCtrl.addItem);
router.post('/update/:id', TodoCtrl.updateItem);

/* Export */
module.exports = router;
