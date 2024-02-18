import {Router} from 'express'
import { addJobCategories, getJobCategoryLocation, getJobCategoryName } from '../Controllers/CategoryControllers';



const CategoryRoute = Router()

CategoryRoute.get('/:Location',getJobCategoryLocation)
CategoryRoute.post('',addJobCategories)
CategoryRoute.get('/Categories/:Name',getJobCategoryName)




export default CategoryRoute;