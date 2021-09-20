import React, {useState, useEffect, useReducer} from 'react'
import TodoList from './TodoList'
import {Context} from './context'
import reducer from './reducer'
import {Button} from 'semantic-ui-react'

export default function App() {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')))
  const [todoTitle, setTodoTitle] = useState('')
  const [todoDate, setTodoDate] = useState('')



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state))
  }, [state])

  const addTodo = event => {
   
      dispatch({
        type: 'add',
        payload: {todoTitle, date: todoDate}
      })
      setTodoTitle('')
      setTodoDate('')
    
  }


  return (
    <Context.Provider value={{
      dispatch
    }}>
      <div className="container">
        <h1>Задачи</h1>

        <div className="row">
          <div className="input-field col s6">
            <input 
              type="text" 
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
              
            />
             <Button onClick={()=>addTodo()}>Добавить</Button>
            <label>Название задачи</label>
          </div>
          <div className="input-field col s6">
          <input 
              type="date" 
              value={todoDate}
              onChange={event => setTodoDate(event.target.value)}
              
            />
            </div>
          </div>

          <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}