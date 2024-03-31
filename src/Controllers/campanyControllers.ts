
import path from 'path'
import dotenv from 'dotenv'
import { Application, Request, Response } from 'express'
import { companyValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


dotenv.config({path:path.resolve(__dirname,'../../env')})

interface iCompanies{
    CompanyID:number
    Name:string
    Description:string
    Industry:string
    Logo:string
    ContactInfo:string
    Email:string
    Password:string
}

interface ExtendedRequest extends Request{
    body:{
        CompanyID:number
        Name:string
        Description:string
        Industry:string
        Logo:string
        ContactInfo:string
        Email:string
        Password:string
    }
}

export const addCompany = async (req:ExtendedRequest, res:Response)=>{
    try {
        let CompanyID = uid()
        const {Name,Description,Industry,Logo,ContactInfo,Email,Password} = req.body
        
        const {error }= companyValidationSchema.validate(req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }
        let hashedPassword = await bcrypt.hash(Password,7)
        await DatabaseHelper.exec('AddNewCompany',{Name,Description,Industry,Logo,ContactInfo,Email,Password:hashedPassword})
        return res.status(201).json({message:"Compony Added Successfully!!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const loginCompany  = async (req:Request, res:Response)=>{
    try {
        const {Email, Password} = req.body
        let company = await(await DatabaseHelper.query(`SELECT * FROM companies WHERE Email='${Email}'`)).recordset
        if(!company[0]){
            return res.status(404).json({message:"company not Found"})
        }
        let  correctPassword = await bcrypt.compare(Password,company[0].Password)
        if(!correctPassword){
            return res.status(404).json({message:"company not Found"})
        }
        const payload = company.map(comp=>{
            const {Password,Email,...rest}=comp
            return rest
        })
        const  token = jwt.sign(payload[0],process.env.SECRET_KEY as string,{expiresIn:"36000"})
        return res.status(201).json({message:"Logged Company Successful",token,role:payload[0].role,Name:payload[0].Name, CompanyID:payload[0].CompanyID})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}


export const getCompanyByID = async (req:Request <{CompanyID:string}> , res:Response) =>{
    try {
        const {CompanyID} = req.params as {CompanyID: string}
        let company : iCompanies= await (await DatabaseHelper.exec('GetCompanyByID',{CompanyID})).recordset[0]
        if (!company){
            return res.status(404).json( {message:"Company not found"} )
        }
        return res.status(200).json(company)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getCompanyByName = async (req:Request <{Name:string}> , res:Response) =>{
    try {
        const {Name} = req.params as {Name: string}
        let company : iCompanies= await (await DatabaseHelper.exec('GetCompanyByName',{Name})).recordset[0]
        if (!company){
            return res.status(404).json( {message:"Company not found"} )
        }
        return res.status(200).json(company)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}

export const getAllCompanies = async (req:ExtendedRequest,res:Response)=>{
    try {
        let company:iCompanies[] = await (await DatabaseHelper.exec('getallCompanies')).recordset
        return res.status(201).json(company)
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


// export const getAllApplication = async (req:ExtendedRequest,res:Response)=>{
//     try {
//         let Application:Application[] = await (await DatabaseHelper.exec('getallApplications')).recordset
//         return res.status(201).json(Application)
//     } catch (error:any) {
//         return res.status(500).json({message:error.message})
//     }
// }