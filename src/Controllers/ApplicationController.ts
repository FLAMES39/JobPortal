
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv'
// import { Request } from 'express';
import express, { Request, Response } from 'express'
import { jobApplicationValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
dotenv.config({path:path.resolve(__dirname,'../../env')})

interface iApplication{
    ApplicationID:number
    Name:string
    Email:string
    contactInfo:string
    JobID:number
    UserID:number
    ApplicationDate:Date
    Status:"Applied" | "Not Applied"
    CoverLetter:string
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

export interface Skill {
    skill: string;
    
}
export interface EducationHistoryItem {
    institution: string;
    degree: string;
    fieldOfStudy: string;

}
export interface EmploymentHistoryItem {
    companyName: string;
    jobTitle: string;
    responsibilities: string;
    reasonForLeaving?: string;
    startDate?: string;
    endDate?: string;
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
    employmentHistoryJson: string,
    educationHistoryJson: string,
    skillsJson: string
  ): Promise<void> => {
    try {
      const employmentHistory: EmploymentHistoryItem[] = JSON.parse(employmentHistoryJson);
      const educationHistory: EducationHistoryItem[] = JSON.parse(educationHistoryJson);
      const skills: Skill[] = JSON.parse(skillsJson);
  
      for (const employment of employmentHistory) {
        await DatabaseHelper.insertEmploymentHistory({ ApplicationID: applicationId, ...employment });
      }
  
      for (const education of educationHistory) {
        await DatabaseHelper.insertEducationHistory({ ApplicationID: applicationId, ...education });
      }
  
      for (const skill of skills) {
        await DatabaseHelper.insertSkill({ ApplicationID: applicationId, Skill: skill.skill });
      }
    } catch (error) {
      console.error('Error inserting related data:', error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };
  
  export const applyJob = async (req: JobApplicationRequest, res: Response) => {
    try {
        const JobID = parseInt(req.params.JobID, 10);
        const { error, value } = jobApplicationValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { Name, Email, contactInfo, employmentHistory, educationHistory, skills, CoverLetter } = value;
      const resumeFile = req.file;
  
      const ApplicationDate = new Date().toISOString().slice(0, 10);
      const Status = 'Applied';
  
      const jobExists = await DatabaseHelper.exec('GetJobByID', {JobID});
      if (!jobExists) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      const applicationId = await DatabaseHelper.insertApplication({
        JobID,
        Name,
        Email,
        contactInfo,
        ApplicationDate,
        Status,
        CoverLetter,
        ResumePath: resumeFile ? resumeFile.path : null,
      });
  
      await insertRelatedData(applicationId, employmentHistory, educationHistory, skills);
  
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