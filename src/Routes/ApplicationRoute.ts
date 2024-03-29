


import { Router } from "express";
import { applyJob, getAllApplications, withdrawApplication } from "../Controllers/ApplicationController";



const applicationRoute = Router();


applicationRoute.post('/:JobID',applyJob)
applicationRoute.get('',getAllApplications)
applicationRoute.delete('',withdrawApplication)



export default applicationRoute;