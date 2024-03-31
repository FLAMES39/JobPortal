
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { jobApplicationValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
dotenv.config({path:path.resolve(__dirname,'../../env')})

interface iApplication{
    ApplicationID:number
    Name:string
    Email:string
    contactInfo:string
    JobTitle:string
    JobID:number
    UserID:number
    Status:"Applied" | "Not Applied"
    ResumePath:string
    employmentHistory:string
    educationHistory:string
    skills:string

}
export interface jobs{
    JobID:number
    CompanyID:number
    CategoryID:number
    Title:string
    Description:string
    Location:string
    SalaryRange:string
    Type:string
    PostedDate:string
    ExpiryDate:string
}

export interface Skills {
    ApplicationID:Number
    skills: string;
    
}
export interface EducationHistory {
    ApplicationID:number
    Institution: string;
    Degree: string;
    FieldOfStudy: string;

}
export interface EmploymentHistory {
    ApplicationID:number
    CompanyName: string;
    JobTitle: string;
    Responsibilities: string;
    ReasonForLeaving?: string;

}
interface ExtendedRequest extends Request{
    body:{
        JobID:number
        UserID:number
        CoverLetter:string
    },
    params:{
        ApplicationID:string
    }
}

interface JobApplicationRequest extends Request {
    file?: Express.Multer.File;
  }
  
  
  
//   const upload = multer({ dest: 'uploads/' });
  
const insertRelatedData = async (
  applicationId: number,
  employmentHistory: EmploymentHistory[],
  educationHistory: EducationHistory[],
  skills: Skills[]
): Promise<void> => {
  for (const employment of employmentHistory) {
    if (Object.values(employment).some(value => value === null )) {
      console.warn('Skipping incomplete employment history record:', employment);
      continue;
    }
    await DatabaseHelper.insertEmploymentHistory({ ...employment, ApplicationID: applicationId });
  }

  for (const education of educationHistory) {
    if (Object.values(education).some(value => value === null )) {
      console.warn('Skipping incomplete education history record:', education);
      continue;
    }
    await DatabaseHelper.insertEducationHistory({ ...education, ApplicationID: applicationId });
  }

  for (const skill of skills) {
    if (!skill.skills) {
      console.warn('Skipping incomplete skill record:', skill); // Logs the entire skill object
      continue;
    }
    await DatabaseHelper.insertSkill({ ApplicationID: applicationId, skills: skill.skills });
  }
  
};




export const applyJob = async (req: JobApplicationRequest, res: Response) => {
  try {
    const JobID = parseInt(req.params.JobID, 10);

    // Parse JSON strings into objects if they are strings; otherwise, use them as they are
    const employmentHistory = typeof req.body.employmentHistory === 'string' ?
      JSON.parse(req.body.employmentHistory) : req.body.employmentHistory;

    const educationHistory = typeof req.body.educationHistory === 'string' ?
      JSON.parse(req.body.educationHistory) : req.body.educationHistory;

    const skills = typeof req.body.skills === 'string' ?
      JSON.parse(req.body.skills) : req.body.skills;

    // Extract other properties from req.body without redeclaring employmentHistory, educationHistory, and skills
    const { Name, Email, contactInfo, JobTitle, UserID } = req.body;

    const resumeFile = req.file;
    const userID = parseInt(UserID, 10);
    const Status = 'Applied';

    const jobExists = await DatabaseHelper.exec('GetJobByID', { JobID });
    if (!jobExists) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applicationId = await DatabaseHelper.insertApplication({
      JobID,
      UserID: userID,
      Name,
      Email,
      contactInfo,
      JobTitle,
      Status: 'Applied',
       // ResumePath:`D:// Application`
       ResumePath: resumeFile ? resumeFile.path : null,
    });
    console.log('applicationId', applicationId);

    await insertRelatedData(applicationId, employmentHistory, educationHistory, skills);
    console.log(skills);

    res.status(201).json({ message: 'Successfully Applied' });
  } catch (error) {
    console.error('Apply Job Error:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};





export const getAllApplications = async  (req:Request , res:Response)=>{
    try {
        let application:iApplication[]= (await DatabaseHelper.exec('sp_getAllApplications')).recordset
        res.status(200).json(application)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const withdrawApplication = async (req:Request<{ApplicationID:string}> , res:Response)=>{
    try {
        const {ApplicationID} = req.params as {ApplicationID:string}
        let application:iApplication =await (await DatabaseHelper.exec('getApplications',{ApplicationID})).recordset[0]

        if(application){
            res.status(200).json(application)
        }
        await DatabaseHelper.exec('DeleteJobApplication',{ApplicationID})
        return res.status(201).json({message:"Withdrawed Sussucceful"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }
}