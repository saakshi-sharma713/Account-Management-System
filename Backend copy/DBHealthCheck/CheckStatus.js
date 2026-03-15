import { supabase } from "../Config/supabase.config.js";

export const checkStatus = async(req,res)=>{
    const {data,error}=await supabase.from("userss").select("*");
    if(error){
        return false;
    }
    return true; 
}