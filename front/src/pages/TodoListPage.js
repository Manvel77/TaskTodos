import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import axios from 'axios';

function TodoListPage() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchingTodo = async () => {
        try {
            const response = await axios.get('http://localhost:8088/todos');
            setTodos(response.data);
        } catch (error) {
            console.error('error get tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchingTodo();
    }, []);

    const addTodo = async (newTodoText) => {
        try {
            const newTodo = { text: newTodoText, completed: false };
            const response = await axios.post('http://localhost:8088/todos', newTodo);
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error('error add tasks:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8088/todos/${id}`);
            if (response.status === 204) {
                setTodos(todos.filter(todo => todo._id !== id));
            }
        } catch (error) {
            console.error('error delete tasks:', error);
        }
    };

    const updateTodo = async (id) => {
        try {
            const updatedTodo = todos.find(todo => todo._id === id);
            const response = await axios.put(`http://localhost:8088/todos/${id}`, {
                ...updatedTodo,
                completed: !updatedTodo.completed
            });
            setTodos(todos.map(todo =>
                todo._id === id ? response.data : todo
            ));
        } catch (error) {
            console.error('error update tasks:', error);
        }
    };

    const filteredTodos = () => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'pending':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>

            <div className="filters">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('pending')}>Pending</button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div>
                    <TodoForm onAddTodo={addTodo} />
                    <TodoItem todos={filteredTodos()} onDelete={deleteTodo} onUpdate={updateTodo} />
                </div>
            )}
        </div>
    );
}

export default TodoListPage;

