const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: String,
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
