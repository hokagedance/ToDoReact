import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todos}) {
  if(todos){
    if (todos[0])
    return (
    <ul>
      {todos.map(item => <TodoItem key={item.id} {...item} />)}
    </ul>
  )
  }
  return (
    <div>Нет записей</div>
  )
  
}