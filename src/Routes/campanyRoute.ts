

import {Router} from 'express'
import { addCompany } from '../Controllers/campanyControllers';


const compnayRoute = Router();


compnayRoute.post('',addCompany)




export default compnayRoute;