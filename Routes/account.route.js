import express from "express"
import { handleLogin, handleSignUp } from "../Controllers/user.controller.js"
import { checkCredentials } from "../Middlewares/auth.middleware.js"
import { supabase } from "../Config/supabase.config.js"
import { AccountStatement, getBalance, transferMoney } from "../Controllers/account.controller.js"
const _route = express.Router()
_route.get("/account/balance",checkCredentials,getBalance)
_route.post("/account/transfer",checkCredentials,transferMoney)
_route.get("/account/statement",checkCredentials,AccountStatement)
export const AccountRouter = _route