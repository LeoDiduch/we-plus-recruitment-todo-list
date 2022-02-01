import React from 'react';
import './App.css';
import { FaPowerOff } from 'react-icons/fa';

import Login from "./Pages/Login";
import useToken from "./utils/useToken";
import TodoList from "./Pages/TodoList";

export default function App() {

  const {token, setToken} = useToken();

  /**
   * Check isConnect
   */
  if(!token) {
    return <Login setToken={setToken} />
  }

    /**
     * Func disconnect
     */
    const handleDisconnect = () => {
        sessionStorage.clear()
        window.location.reload(false);
    }

  return (
      <div className='todo-app'>
          <div className="todo-head">
              <h1>{token.user.name}</h1>
              <div className="logout" onClick={handleDisconnect}>
                  <FaPowerOff className='delete-icon'/>
                  <p>Se déconnecter</p>
              </div>
          </div>
          <TodoList token={token}/>
      </div>
  );
};
