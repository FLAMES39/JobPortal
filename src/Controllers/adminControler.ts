
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
        console.log(user);
        
        if(user){
            res.status(200).json(user)
        }
        await DatabaseHelper.exec('DeleteUser',{UserID})
        return res.status(201).json({message:"Removed User Sussucceful"})
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
        let user:Users =await (await DatabaseHelper.exec('GetCompanyByID',{CompanyID})).recordset[0]

        if(user){
            res.status(200).json(user)
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

        if(user){
            res.status(200).json(user)
        }
        await DatabaseHelper.exec('sp_SoftDelete',{UserID})
        return res.status(201).json({message:"User Temporarily Suspended"})
    } catch (error:any) {

        return res.status(500).json(error.message)
    }
}