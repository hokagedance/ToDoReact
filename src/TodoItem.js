import React, { useContext, useState } from 'react'
import { Context } from './context'
import {Modal, Button} from 'semantic-ui-react'
import style from './Modal.module.css'

export default function TodoItem({ title, id, completed, date }) {
  const { dispatch } = useContext(Context)
  const [todoDate, setTodoDate] = useState('')
  const [todoTitle, setTodoTitle] = useState('')
  const [open, setOpen] = React.useState(false)
  const editTodo = (event, todo) => {
   
      dispatch({
        type: 'edit',
        payload: {title: todoTitle, date: todoDate, id, completed}
      })
      setTodoTitle('')
      setTodoDate('')
      setOpen(false)
    }
  
  
  

  const cls = ['todo']

  if (completed) {
    cls.push('completed')
  }

  return (
    <li className={cls.join(' ')}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch({
            type: 'toggle',
            payload: id
          })}
        />
        <span>{title}</span>
        <small>{date}</small>
        <Modal className={style.modal} 
          onClose={() => setOpen(false)}
         onOpen={() => setOpen(true)}
         open={open} trigger={<Button>Изменить</Button>}>
        <Modal.Content image>
        <div className="row">
          <div className="input-field col s6">
            <input 
              type="text" 
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
            />
             
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
          </Modal.Content>
          <Modal.Actions>
        <Button
          onClick={() => editTodo()}
        >
          Изменить
        </Button>
        <Button onClick={()=>setOpen(false)}>
        Отмена
        </Button>
      </Modal.Actions>
          </Modal>
          
          
        <i
          className="material-icons red-text"
          onClick={() => dispatch({
            type: 'remove',
            payload: id
          })}
        >
          delete
        </i>
      </label>
    </li>
  )
}