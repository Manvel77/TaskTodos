import React from 'react';

function TodoItem({todos, onDelete, onUpdate}) {
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onUpdate(todo._id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                    <button onClick={() => onDelete(todo._id)} className='delete-btn'>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default TodoItem;