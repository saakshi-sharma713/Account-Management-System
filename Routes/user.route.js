import express from "express"
import { handleLogin, handleSignUp } from "../Controllers/user.controller.js"
import { checkCredentials } from "../Middlewares/auth.middleware.js"
import { supabase } from "../Config/supabase.config.js"
const _route = express.Router()
_route.post("/SignUp", handleSignUp)
_route.post("/login", handleLogin)

export const UserRouter = _route