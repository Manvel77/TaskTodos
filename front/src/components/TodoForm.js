import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            onAddTodo(newTodo);
            setNewTodo('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter a new task"
                className="todo-input"
            />
            <button type="submit" className="add-btn">Add Task</button>
        </form>
    );
}

export default TodoForm;
