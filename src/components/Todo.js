import React, { useState } from 'react';
import Moment from 'react-moment';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        label: '',
        is_done: 0
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value, edit.is_done);

        setEdit({
            id: null,
            label: '',
            is_done: 0
        });
    };

    if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
    }

    return todos.map((todo) => (
        <div className={todo.todo_is_done === 1 ? 'todo-row complete' : 'todo-row'} key={todo.todo_id}>
            <div key={todo.todo_id} className="todo-desc" onClick={() => completeTodo(todo.todo_id, todo.todo_label, todo.todo_is_done)}>
                <h3>{todo.todo_label}</h3>
                <Moment className="date" format="DD/MM/YYYY">{todo.todo_date}</Moment>
            </div>
            <div className='icons'>
                <RiCloseCircleLine onClick={() => removeTodo(todo.todo_id)} className='delete-icon' />
                <TiEdit onClick={() => setEdit({ id: todo.todo_id, label: todo.todo_label, is_done: todo.todo_is_done })} className='edit-icon' />
            </div>
        </div>
    ));
};

export default Todo;