import { supabase } from "./Config/supabase.config.js";
export async function checkStatus(){
    const {data,error} = await supabase.from("userss").select("*");
    if(error){
        return false;
    }
    return true;
}