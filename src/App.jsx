
import { useEffect, useState } from 'react'
import { Todoprovider } from './context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';


function App() {
  const [todos,setTodos]=useState([]);

  const addTodo=(todo)=>{

   setTodos((prev)=>[...prev,{...todo,id:Date.now()}])
  //  setTodos((prevTodo)=>[{id:Date.now(),...todo},...prevTodo])
  }
  
  const updateTodo=(id,todo)=>{
    //todos array hai aapko loop lagake todo with that id find karna hoga
    setTodos((prevTodo)=>prevTodo.map((prev)=>(prev.id ===id ?todo : prevTodo)))
  }
  
  const deleteTodo=(id)=>{
    setTodos((prevTodo)=> prevTodo.filter((todo)=>todo.id !== id))
  }

  const toggleCompleted=(id)=>{
    setTodos((prevTodo)=>prevTodo.map((prev)=> prev.id===id ? {...prev, completed: !prev.completed} : prevTodo))
  }


  useEffect(()=>{
  const todos= JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
    setTodos(todos)
     }
  },[]);

  useEffect(()=>{
   localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  return (
    <Todoprovider value={{todos,addTodo,updateTodo,deleteTodo,toggleCompleted}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo)=>(
            <div key={todo.id}
            className='w-full'>
              <TodoItem todo={todo} />
            </div>

          ))}
            
        </div>
    </div>
</div>
</Todoprovider>
  )
}

export default App
