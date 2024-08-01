
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import path from 'path'
import {v4 as uid} from 'uuid'
import { jobCategoryValidationSchema, jobValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'

dotenv.config({path:path.resolve(__dirname,'../../env')})


interface ijobs{
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

interface jobCategory{
    CategoryID:number
    Name:string
    Description:string
}



interface ExtendedRequest extends Request{
    body:{
        jobID:number
        CompanyID:number
        CategoryID:number
        Title:string
        Description:string
        Location:string
        SalaryRange:string
        Type:string
        PostedDate:string
        ExpiryDate:string
    },
    params:{
        JobID:string
        CategoryID:string
    }
}



export const postJob = async (req:ExtendedRequest, res:Response)=>{
    try {
        const {Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate}=req.body
        const {error}= jobValidationSchema.validate(req.body)
        if(error){
           return res.status(404).json(error.details[0].message)
        }
        await DatabaseHelper.exec('CreateJobPosting',{Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate})
        return res.status(201).json({message:"JobPosted Successful"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const getAllJobs= async (req:ExtendedRequest, res: Response)=>{
    try {
        let jobs: ijobs[]= (await DatabaseHelper.exec('sp_getAllJobs')).recordset
      return   res.status(201).json(jobs)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const updateJob = async (req:ExtendedRequest , res:Response)=>{
    try {
        const {CompanyID,CategoryID,Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate} = req.body
        const {error}= jobValidationSchema.validate(req.body)
        if(error){
           return res.status(404).json(error.details[0].message)
        }
        let {JobID} =req.params as {JobID:string}
        let job:ijobs[]=await (await DatabaseHelper.exec('GetJobByID',{JobID})).recordset[0]
        if (!job){
            return res.status(404).json({message:"Job not found"})
        }
        await DatabaseHelper.exec('UpdateJobPosting',{CompanyID,CategoryID,Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate})
        return res.status(201).json({message:"Job Updated"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const deleteJob = async (req:Request <{JobID:string}>,res:Response)=>{
    try {
        const { JobID} = req.params as {JobID: string}
        let job: ijobs= await (await DatabaseHelper.exec('GetJobByID',{JobID})).recordset[0]
        if (!job){
            return res.status(404).json( {message:"Job not found"} )
        }
        await DatabaseHelper.exec('DeleteJobPosting',{JobID})
        return res.status(201).json({message:"Deleted Successfull"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const getJobByID = async (req:Request <{jobID:string}> , res:Response) =>{
    try {
        const {jobID} = req.params as {jobID: string}
        let job: ijobs= await (await DatabaseHelper.exec('GetJobByID',{jobID})).recordset[0]
        if (!job){
            return res.status(404).json( {message:"Job not found"} )
        }
        return res.status(200).json(job)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getJobCategory= async (req:Request <{CategoryID:string}> , res:Response) =>{
    try {
        const {CategoryID} = req.params as {CategoryID: string}
        let jobCategory: ijobs= await (await DatabaseHelper.exec('GetJobCategory',{CategoryID})).recordset[0]
        console.log(CategoryID);
        
        if (!jobCategory){
            return res.status(404).json( {message:"JobCategory not found"} )
        }
        return res.status(200).json(jobCategory)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const addJobCategories = async (req:Request, res:Response)=>{
    try {
        const {Name, Description}=req.body as {
            CategoryID:number
            Name:string
            Description:string
        }
        const {error}= jobCategoryValidationSchema.validate(req.body)
        if(error){
           return res.status(404).json(error.details[0].message)
        }
        await DatabaseHelper.exec('CreateJobPosting')
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const searchJobs = async (req: Request, res: Response): Promise<void> => {
    const searchJob = req.query.term as string;
    console.log(`Received search term: ${searchJob}, Type: ${typeof searchJob}`);
    
  
    try {
      const result = await DatabaseHelper.exec('SearchJobs', { searchJob});
      console.log(result);
      
  
      // Assuming the stored procedure returns a result set
      const jobs = result.recordset;
  
      res.json(jobs);
    } catch (error) {
      console.error('Error searching jobs:', error);
      res.status(500).json({ message: 'Error searching Jobs' });
    }
  };
  