


import { Router } from "express";
import { applyJob, getAllApplications, withdrawApplication } from "../Controllers/ApplicationController";
import multer from "multer";



const applicationRoute = Router();
const upload = multer({ dest: 'uploads/' }); 

// applicationRoute.post('/:JobID',applyJob)
applicationRoute.get('',getAllApplications)
applicationRoute.delete('',withdrawApplication)
applicationRoute.post('/apply/:JobID', upload.single('ResumePath'), applyJob);


export default applicationRoute;