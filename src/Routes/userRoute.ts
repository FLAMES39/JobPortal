import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/userCcontroller";


const userRoute= Router()



userRoute.post('',registerUser)
userRoute.post('/:login',loginUser)


export default userRoute