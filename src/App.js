import React from 'react';
import './App.css';
import Login from "./Pages/Login";
import useToken from "./utils/useToken";

export default function App() {

  const {token, setToken} = useToken();

  /**
   * Check isConnect
   */
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
      <div className='todo-app'>
        <h1>My Todo List App</h1>
      </div>
  );
};
