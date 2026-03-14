import express from "express"
import cors from "cors"
import { checkStatus } from "./DBHealthCheck.js";
import { UserRouter } from "./Routes/user.route.js";
const app=express()
const PORT=8800;
app.use(cors())
app.use(express.json())
app.use("/user",UserRouter)
app.listen(PORT,()=>{
    const status = checkStatus();
    if(!status){
        console.log("Failed to connect");
        return
    }
    console.log("Database connected Sucessfully :)")
    console.log(`Server is running at PORT:${PORT}`)
})