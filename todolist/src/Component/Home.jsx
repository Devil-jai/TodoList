import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import del from '../img/delete.png'

function Home() {
  const [todos, setTodos] = useState([]);

  const handleEdit = (id) => {
    axios.put(`${window.location.origin}/update/`+id)
    .then(result => {window.location.reload()})
    .catch(err=>console.log(err))
  }

  const handleDelete = (id) =>{
    axios.delete(`${window.location.origin}/delete/`+id)
    .then(result => {
        window.location.reload()
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    axios
      .get(`${window.location.origin}/get`)
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="home mt-5">
      <h2>Todo List</h2>
      <Create />
      {todos.length === 0 ? (
        <div>
          <h2>No Record</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} style={{width:"200px"}} className="mt-3 px-2 d-flex align-items-center justify-content-between bg-black text-white" onClick={()=>handleEdit(todo._id)}>
            {todo.done? <input type="radio" checked/> : <input type="radio" />
            }
           
            <span className={todo.done? "text-decoration-line-through " : ""}>{todo.task}</span>

            <div onClick={()=>handleDelete(todo._id)} style={{cursor:"pointer"}}><img src={del}/></div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
