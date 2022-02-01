import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            todo_label: input,
            todo_is_done: 0
        });
        setInput('');
    };

    const handleSubmitEdit = e => {
        e.preventDefault();

        props.onSubmit(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
            {props.edit ? (
                <>
                    <input
                        placeholder='Changer le nom de la tache'
                        value={input}
                        onChange={handleChange}
                        name='todo_label'
                        ref={inputRef}
                        className='todo-input edit'
                    />
                    <button onClick={handleSubmitEdit} className='todo-button edit'>
                        Mettre à jour
                    </button>
                </>
            ) : (
                <>
                    <input
                        placeholder='Nom de la tâche'
                        value={input}
                        onChange={handleChange}
                        name='todo_label'
                        className='todo-input'
                        ref={inputRef}
                    />
                    <button type='submit' onClick={handleSubmit} className='todo-button'>
                        Ajouter tâche
                    </button>
                </>
            )}
        </form>
    );
}

export default TodoForm;