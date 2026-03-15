import { supabase } from "../Config/supabase.config.js"

export async function getBalance(req,res){
  const {email} = req.user 
   const {data,error} = await supabase.from("userss").select().eq("email",email).single()
      if(error){
          return res.json({error:error.message})
      }
      return res.json({Balance:data.balance})
}



export const transferMoney = async (req,res)=>{

 const {email} = req.user
 
 const {receiver_email,amount} = req.body
if(!receiver_id||!amount){
      return res.status(400).json({message:"All Fields are required"})
}
 const {data:sender,error} = await supabase.from("userss").select().eq("email",email).single()
 const sender_id = sender.id
console.log(sender)
 if(sender.balance < amount){
  return res.json({message:"Insufficient balance"})
 }

 const {data:receiver} = await supabase.from("userss").select("*").eq("id",receiver_email).single()

 if(!receiver){
  return res.json({message:"Receiver not found"})
 }
 const receiver_id = receiver.id

 const senderBalance = sender.balance - amount
 const receiverBalance = receiver.balance + amount

 const {data1,error1} = await supabase.from("userss").update({balance:senderBalance}).eq("id",sender_id)

const {data2,error2} =  await supabase.from("userss").update({balance:receiverBalance}).eq("id",receiver_id)

 const {data3,error3} = await supabase.from("transaction").insert([
  {
   sender_id,
   receiver_id,
   amount,
   transaction_type:"debit"
  },
  {
   sender_id,
   receiver_id,
   amount,
   transaction_type:"credit"
  }
 ])

 res.json({message:"Transfer successful",status:true,senderBalance:data1.balance})
}


export const AccountStatement = async(req,res)=>{
    const {email} = req.user
    const {data:result,error} = await supabase.from("userss").select().eq("email",email).single()
    const id = result.id
    const {data:sender,error1} = await supabase.from("transaction").select().eq("sender_id",id)
     const {data:receiver,error2} = await supabase.from("transaction").select().eq("receiver_id",id)
 
    
     const response = [{sender:sender.name,amount:sender.amount,receiver:receiver.name,transaction_type:sender.transaction_type},{sender:sender.name,amount:sender.amount,receiver:receiver.name,transaction_type:receiver.transaction_type}]
     if(error1 || error2){
       
          return res.json({error:error1.message})
     }
     return res.json({message:"Account Statement",data:response})
}