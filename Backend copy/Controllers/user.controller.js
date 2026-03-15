import bcrypt from "bcrypt"
import { supabase } from "../Config/supabase.config.js";
import { createToken } from "../Services/user.service.js";
export async function handleSignUp(req,res){
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"All Fields are required"})
    }
    
    const hashedPassword = await bcrypt.hash(password,10)
    const {data,error} = await supabase.from("userss").insert([{name,email,password:hashedPassword}]).select();
    if(error){
        return res.json({error:error.message})
    }
    return res.json({message:"User SignedUp Sucessfully :)",data,status:true})
}

export async function handleLogin(req,res){
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).json({message:"All Fields are required"})
    }
    
    const {data,error} = await supabase.from("userss").select().eq("email",email).single()
    if(error){
        return res.json({error:error.message})
    }
    const result = await bcrypt.compare(password,data.password)
    if(!result){
     return res.status(400).json({message:"Password is incorrect"})
    }
    const token = createToken(data)
    return res.json({message:"User Logged In Sucessfully :)",data,token})
}

