

import {Router} from 'express'
import { addCompany, getCompanyByID, getCompanyByName, loginCompany } from '../Controllers/campanyControllers';
import { getAllCompanies } from '../Controllers/adminControler';
import { getAllApplications } from '../Controllers/ApplicationController';


const compnayRoute = Router();


compnayRoute.post('',addCompany)
compnayRoute.post('/:login',loginCompany)
compnayRoute.get('/:Name',getCompanyByName)
compnayRoute.get('/Company/:CompanyID',getCompanyByID)
compnayRoute.get('',getAllCompanies)
compnayRoute.get('/applications',getAllApplications)




export default compnayRoute;