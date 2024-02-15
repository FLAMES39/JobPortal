

import {Router} from 'express'
import { addJobCategories, deleteJob, getAllJobs, getJobByID, getJobCategory, postJob, updateJob } from '../Controllers/jobController';

const jobRoute = Router()


jobRoute.post('',postJob)
jobRoute.get('',getAllJobs)
jobRoute.put('/:JobID',updateJob)
jobRoute.delete('/:JobID',deleteJob)
jobRoute.get('/:JobID',getJobByID)
jobRoute.get('/Categories/:CategoryID',getJobCategory)
jobRoute.post('/:add',addJobCategories)

export default jobRoute;