
import path from 'path'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { DatabaseHelper } from '../DatabaseHelper'


dotenv.config({path:path.resolve(__dirname,'../../env')})



interface Users {
    UserID:string
    Name:string
    Email:string
    Password:string
    ProfilePicture:File
    Resume:string
    Bio:string
    emailsent:number
}

interface jobs{
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
interface ExtendedRequest extends Request{
    body:{
        Name:string
        Email:string
        Password:string
        CompanyID:number
        Description:string
        Industry:string
        Logo:string
        ContactInfo:string
        
    }
    params:{
        UserID:string,
        Email:string
    }
}



interface iCompanies{
    CompanyID:number
    Name:string
    Description:string
    Industry:string
    Logo:string
    ContactInfo:string
}

// interface ExtendedRequest extends Request{
//     body:{
//         CompanyID:number
//         Name:string
//         Description:string
//         Industry:string
//         Logo:string
//         ContactInfo:string
//     }
// }



export const getAllUsers = async (req:ExtendedRequest,res:Response)=>{
    try {
       let user:Users[] = await(await DatabaseHelper.exec('getallUser')).recordset
       if(user){
            return res.status(201).json(user)
       }
       return res.status(404).json({message:"No Users Found"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}



export const DeleteUser = async (req:Request<{UserID:string}> , res:Response)=>{
    try {
        const {UserID} = req.params as {UserID:string}
        let user:Users =await (await DatabaseHelper.exec('GetUserByID',{UserID})).recordset[0]
        // console.log(user);
        
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        await DatabaseHelper.exec('DeleteUser',{UserID})
        return res.status(200).json({message:"Removed User Sussucceful"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }
}
export const DeleteJob = async (req:Request<{JobID:string}> , res:Response)=>{
    try {
        const {JobID} = req.params as {JobID:string}
        let Job:jobs =await (await DatabaseHelper.exec('GetJobByID',{JobID})).recordset[0]
        // console.log(Job);
        
        if(!Job){
            res.status(404).json({message:"Job not found"})
        }
        await DatabaseHelper.exec('DeleteJobPosting',{JobID})
        return res.status(200).json({message:"Removed Job Sussucceful"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }
}


export const getAllCompanies = async (req:ExtendedRequest,res:Response)=>{
    try {
       let companies:iCompanies[] = await(await DatabaseHelper.exec('getallCompanies')).recordset
       if(companies){
            return res.status(201).json(companies)
       }
       return res.status(404).json({message:"No User Found"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}

export const DeleteCompany = async (req:Request<{CompanyID:string}> , res:Response)=>{
    try {
        const {CompanyID} = req.params as {CompanyID:string}
        let company:iCompanies =await (await DatabaseHelper.exec('GetCompanyByID',{CompanyID})).recordset[0]

        if(!company){
            res.status(400).json({message:"Company not found"})
        }
        await DatabaseHelper.exec('DeleteCompany',{CompanyID})
        return res.status(201).json({message:"Removed Company Sussucceful"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }   
}

//Suspend User Temporarily
export const SoftDeleteUser = async (req:Request<{UserID:string}> , res:Response)=>{
    try {
        const {UserID} = req.params as {UserID:string}
        let user:Users =await (await DatabaseHelper.exec('GetUserByID',{UserID})).recordset[0]

        if(!user){
            res.status(400).json({message:"User not Found"})
        }
        await DatabaseHelper.exec('sp_SoftDelete',{UserID})
        return res.status(201).json({message:"User Temporarily Suspended"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }
}


