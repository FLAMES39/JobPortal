
import path from 'path'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { jobApplicationValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
dotenv.config({path:path.resolve(__dirname,'../../env')})

interface iApplication{
    ApplicationID:number
    JobID:number
    UserID:number
    ApplicationDate:Date
    Status:"Applied" | "Not Applied"
    CoverLetter:string
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

export const applyJob = async (req:ExtendedRequest, res: Response)=>{

    try {
       
        const ApplicationDate = new Date().toISOString().slice(0, 10); // Converts to 'YYYY-MM-DD'

        let Status = 'Not Applied'

       const {JobID,UserID,CoverLetter} = req.body
    
       if(!JobID || !UserID || !CoverLetter){
               return res.status(400).json({message:"Missing required fields"})
       }

     const {error}= jobApplicationValidationSchema.validate(req.body)

     if (error){
        return res.status(404).json(error.details[0].message)
     }

        await DatabaseHelper.exec('ApplyForJob',{JobID,UserID,ApplicationDate,Status,CoverLetter})
        return res.status(201).json({ message: "Successfully Applied" ,})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const getAllApplications = async  (req:Request , res:Response)=>{
    try {
        let application:iApplication[]= (await DatabaseHelper.exec('')).recordset
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