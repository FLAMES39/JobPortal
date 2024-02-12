import { Router } from "express";
import { getAllUsers, getUserByEmail, getUserByID, loginUser, registerUser, updateUser } from "../Controllers/userCcontroller";


const userRoute= Router()



userRoute.post('',registerUser)
userRoute.post('/:login',loginUser)
userRoute.get('',getAllUsers)
userRoute.get('/:UserID',getUserByID)
userRoute.get('/email/:Email',getUserByEmail)
userRoute.put('/:UserID',updateUser)


export default userRoute;