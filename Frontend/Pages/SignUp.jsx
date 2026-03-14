import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
      const navigate = useNavigate()
    const URL= import.meta.env.VITE_BACKEND_URL
    async function handleSubmit(e){
        
        e.preventDefault();
         const response = await axios.post(`${URL}/auth/SignUp`,{name,email,password})
         if(response.status){
            console.log(response.data)
            navigate("/dashboard")
         }
    }
  return (
    <div>
      <form class="form" onSubmit={(e)=>{handleSubmit(e)}}>
        <h1>SignUp</h1>
        
        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='enter your name'/>
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your email'/>
         <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'/>
        <button>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp
