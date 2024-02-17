


import { Router } from "express";
import { getAllUsers } from "../Controllers/userCcontroller";
import { DeleteCompany, DeleteUser, SoftDeleteUser, getAllCompanies } from "../Controllers/adminControler";


const adminRoute = Router()

adminRoute.get('',getAllUsers)
adminRoute.get('/companies',getAllCompanies)
adminRoute.delete('',DeleteUser)
adminRoute.delete('/softdelete',SoftDeleteUser)
adminRoute.delete('/deleted/company',DeleteCompany)



export default adminRoute;