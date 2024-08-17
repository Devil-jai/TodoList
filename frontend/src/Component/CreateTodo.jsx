import React, { useEffect, useState } from "react";
import axios from "axios";
const url = "http://localhost:4000";

function CreateTodo() {
  const [addtask, setaddTask] = useState();
  const [task, setTask] = useState([]);

  const AddTask = () => {
    axios
      .post(`${url}/add`, {
        task: addtask,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios
      .get(`${url}/get`, {})
      .then((result) => setTask(result.data.task))
      .catch((err) => console.log(err));
  };
  const DeleteUser = (id) =>{
    axios.delete(`${url}/delete/`+id)
    .then(()=>window.location.reload())
    .catch(err=>console.log(err))
  }

  const update =(id)=>{
    axios.put(`${url}/update/`+id)
    .then(()=>window.location.reload())
    .catch((err)=>console.log(err))
  }
console.log(task);
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-center text-3xl font-semibold mb-4">To Do List</h1>
      <div className="md:w-1/2 mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form id="todo-form">
            <div className="flex mb-4">
              <input
                type="text"
                onChange={(e) => setaddTask(e.target.value)}
                className="w-full px-4 py-2 mr-2 rounded-lg
                             border-gray-300 focus:outline-none
                              focus:border-blue-500"
                id="todo-input"
                placeholder="Add new task"
                required
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded"
                onClick={AddTask}
              >
                Add
              </button>
            </div>
          </form>
          <ul id="todo-list">
         {
          task.map((data,index)=>(
            
            <div className="mb-3">
              <li className="flex justify-between mt-2 items-center" key={index} >
              <div onClick={()=>update(data._id)}>
                {data.done?<input type="radio"  checked/>: <input type="radio"  />}
                
              <span className={data.done?"line-through m-2":"mx-2"}>{data.task}</span>
              {/* <span className="line-through">{data.task}</span> */}
              </div>
              <button className="text-red-500" onClick={()=>DeleteUser(data._id)}>Delete</button>
              
              </li>
              <hr className="mt-3" />
            </div>
            
          ))
         }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
