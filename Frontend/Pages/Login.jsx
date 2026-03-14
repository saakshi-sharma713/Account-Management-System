import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [name,setName] = useState("");
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const URL= import.meta.env.VITE_BACKEND_URL
    async function handleSubmit(e){
        e.preventDefault();
         const response = await axios.post(`${URL}/auth/login`,{email,password})
         if(response.status){
            console.log(response.data)
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
         }
    }
  return (
    <div>
      <form class="form" onSubmit={(e)=>{handleSubmit(e)}}>
        <h1>Login</h1>
        
        
        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your email'/>
         <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your password'/>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
