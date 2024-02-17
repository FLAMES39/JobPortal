import {Router} from 'express'
import { addJobCategories, getJobCategoryLocation, getJobCategoryName } from '../Controllers/CategoryControllers';



const CategoryRoute = Router()

CategoryRoute.get('/Category/:Location',getJobCategoryLocation)
CategoryRoute.post('',addJobCategories)
CategoryRoute.get('/Categories/Category/:Name',getJobCategoryName)




export default CategoryRoute;