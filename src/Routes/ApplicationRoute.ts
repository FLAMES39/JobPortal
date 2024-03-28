


import { Router } from "express";
import { applyJob, getAllApplications, withdrawApplication } from "../Controllers/ApplicationController";
import multer from "multer";



const applicationRoute = Router();
const upload = multer({ dest: 'uploads/' }); // Setup multer as needed

// applicationRoute.post('/:JobID',applyJob)
applicationRoute.get('',getAllApplications)
applicationRoute.delete('',withdrawApplication)
applicationRoute.post('/applyJob/:JobID', upload.single('resume'), applyJob);


export default applicationRoute;