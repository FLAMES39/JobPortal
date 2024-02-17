

import {Router} from 'express'
import { addCompany, getCompanyByID, getCompanyByName } from '../Controllers/campanyControllers';


const compnayRoute = Router();


compnayRoute.post('',addCompany)
compnayRoute.get('/:Name',getCompanyByName)
compnayRoute.get('/Company/:CompanyID',getCompanyByID)




export default compnayRoute;