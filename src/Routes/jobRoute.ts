

import {Router} from 'express'
import { addJobCategories, deleteJob, getAllJobs, getJobByID, getJobCategory, postJob, searchJobs, updateJob } from '../Controllers/jobController';

const jobRoute = Router()


jobRoute.post('',postJob)
jobRoute.get('',getAllJobs)
jobRoute.put('/:jobID',updateJob)
jobRoute.delete('/:jobID',deleteJob)
jobRoute.get('/:jobID',getJobByID)
jobRoute.get('/Categories/:CategoryID',getJobCategory)
jobRoute.post('/:add',addJobCategories)
jobRoute.get('/search',searchJobs)

export default jobRoute;