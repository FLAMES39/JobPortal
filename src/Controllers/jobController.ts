
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import path from 'path'
import {v4 as uid} from 'uuid'
import { jobValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'

dotenv.config({path:path.resolve(__dirname,'../../env')})


interface jobs{
    CompanyID:number
    CategoryID:number
    Title:string
    Description:string
    Location:string
    SalaryRange:string
    Type:string
    PostedDate:Date
    ExpiryDate:Date
}

export const podtJob = async (req:Request, res:Response)=>{
    try {
        const {CompanyID,CategoryID,Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate}=req.body
        const {error}= jobValidationSchema.validate(req.body)
        if(error){
           return res.status(404).json(error.details[0].message)
        }
        await DatabaseHelper.exec('CreateJobPosting',{CompanyID,CategoryID,Title,Description,Location,SalaryRange,Type,PostedDate,ExpiryDate})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}