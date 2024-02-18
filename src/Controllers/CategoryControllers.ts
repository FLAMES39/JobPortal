import dotenv from 'dotenv'
import { Request, Response } from 'express'
import path from 'path'
import {v4 as uid} from 'uuid'
import { jobCategoryValidationSchema, jobValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'

dotenv.config({path:path.resolve(__dirname,'../../env')})


interface jobCategory{
    CategoryID:number
    Name:string
    Description:string
}


interface ExtendedRequest extends Request{
    body:{
        Name:string
        Description:string
    },
    params:{
        Name:string
    }
}



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




export const getJobCategoryName= async (req:Request <{Name:string}> , res:Response) =>{
    try {
        const {Name} = req.params as {Name: string}
        let jobCategory: ijobs= await (await DatabaseHelper.exec('GetJobCategory',{Name})).recordset[0]
        console.log(Name);
        
        if (!jobCategory){
            return res.status(404).json( {message:"JobCategory not found"} )
        }
        return res.status(200).json(jobCategory)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}



export const getJobCategoryLocation= async (req:Request <{Location:string}> , res:Response) =>{
    try {
        const {Location} = req.params as {Location: string}
        let jobCategory: ijobs= await (await DatabaseHelper.exec('GetJobCategory',{Location})).recordset[0]
        console.log(Location);
        
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
        await DatabaseHelper.exec('CreateJobPosting',{Name,Description})
        return res.status(200).json({message:"Added Successful"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}