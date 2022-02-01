import React, { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import Todo from '../components/Todo';

function TodoList(props) {
    const {token} = props;
    const [todos, setTodos] = useState([]);
    const [getData, setGetData] = useState(false);
    
/**
 * Call API
 */
    const getAllTodo = () => {
        const fetchData = async () => {
            const res = await fetch('https://test1.quadra-informatique.fr/api/todo/list', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token,
                    'user-id': token.user.id
                }),
            });
            const data = await res.json();
            setTodos(data)
        }
        fetchData();
    }

    const todoCreate = (todo) => {
        const fetchData = async () => {
            const res = await fetch('https://test1.quadra-informatique.fr/api/todo', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token,
                    'user-id': token.user.id
                }),
                body: JSON.stringify(todo)
            });
        }
        fetchData();
        setGetData(true)
    }

    const todoDelete = id => {
        const fetchData = async () => {
            const res = await fetch(`https://test1.quadra-informatique.fr/api/todo/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token,
                    'user-id': token.user.id
                }),
            });
        }
        fetchData();
        setGetData(true)
    }
    
    const todoUpdate = credentials => {
        console.log(credentials)
        const fetchData = async () => {
            const res = await fetch('https://test1.quadra-informatique.fr/api/todo', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token.token,
                    'user-id': token.user.id
                }),
                body: JSON.stringify(credentials)
            });
        }
        fetchData();
        setGetData(true)
    }


/**
 * Get todo informations
 */
    useEffect(() => {
        getAllTodo();
    })

    useEffect(() => {
        if(getData) {
            setGetData(false);
            getAllTodo();
        }
    }, [getData])

/**
 * All todo list function
 */

    const addTodo = async todo => {
        if (!todo.todo_label || /^\s*$/.test(todo.todo_label)) {
            return;
        }

        await todoCreate(todo);
        await getAllTodo();
    };

    const removeTodo = async id => {
        await todoDelete(id);
        await getAllTodo();
    }

    const updateTodo = async (id, newValue, isDone) => {
        if (!newValue || /^\s*$/.test(newValue)) {
            return;
        }

        await todoUpdate({
            todo_id: id,
            todo_label: newValue,
            todo_is_done: isDone
        })
        await getAllTodo();
    };

    const completeTodo = async (id, label, isDone) => {
        await todoUpdate({
            todo_id: id,
            todo_label: label,
            todo_is_done: !isDone
        })
        await getAllTodo();
    };

    return (
        <>
            <h2>Ma liste de tâches</h2>
            <TodoForm onSubmit={addTodo} />
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </>
    );
}

export default TodoList;