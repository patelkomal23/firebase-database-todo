
import React from 'react'
import { useDispatch } from 'react-redux'
import { createTodo, getTodo } from './features/Todo/thunk'
import TodoApp from './components/Todo'

const App = () => {

  return (
    <>
      <TodoApp/>
    </>
  )
}

export default App
