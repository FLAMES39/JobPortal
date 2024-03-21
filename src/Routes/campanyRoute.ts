

import {Router} from 'express'
import { addCompany, getCompanyByID, getCompanyByName, loginCompany } from '../Controllers/campanyControllers';


const compnayRoute = Router();


compnayRoute.post('',addCompany)
compnayRoute.post('/:login',loginCompany)
compnayRoute.get('/:Name',getCompanyByName)
compnayRoute.get('/Company/:CompanyID',getCompanyByID)




export default compnayRoute;