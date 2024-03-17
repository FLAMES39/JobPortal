
import path from 'path'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { companyValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
import {v4 as uid} from 'uuid'


dotenv.config({path:path.resolve(__dirname,'../../env')})

interface iCompanies{
    CompanyID:number
    Name:string
    Description:string
    Industry:string
    Logo:string
    ContactInfo:string
}

interface ExtendedRequest extends Request{
    body:{
        CompanyID:number
        Name:string
        Description:string
        Industry:string
        Logo:string
        ContactInfo:string
    }
}

export const addCompany = async (req:ExtendedRequest, res:Response)=>{
    try {
        let CompanyID = uid()
        const {Name,Description,Industry,Logo,ContactInfo} = req.body
        
        const {error }= companyValidationSchema.validate(req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }
        await DatabaseHelper.exec('AddNewCompany',{Name,Description,Industry,Logo,ContactInfo})
        return res.status(201).json({message:"Compony Added Successfully!!"})
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