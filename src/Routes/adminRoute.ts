


import { Router } from "express";
import { getAllUsers } from "../Controllers/userCcontroller";
import { DeleteCompany, DeleteJob, DeleteUser, SoftDeleteUser, getAllCompanies } from "../Controllers/adminControler";


const adminRoute = Router()

adminRoute.get('',getAllUsers)
adminRoute.get('/companies',getAllCompanies)
adminRoute.delete('/delete/:UserID',DeleteUser)
adminRoute.delete('/:UserID',SoftDeleteUser)
adminRoute.delete('/deleted/company/:CompanyID',DeleteCompany)
adminRoute.delete('/delete/delete/job/:JobID',DeleteJob)



export default adminRoute;