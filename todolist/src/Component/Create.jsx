import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask ] = useState()
  const handleadd = () =>{
    axios.post(`${window.location.origin}/add`,{task:task})
    .then(result => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='create_form'>
        <input type="text" onChange={(e)=>setTask(e.target.value)}/>
        <button onClick={handleadd}>Add</button>
    </div>
  )
}

export default Create