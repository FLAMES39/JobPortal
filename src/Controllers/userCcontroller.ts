



import path from 'path'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import bcrypt from'bcrypt'
import {v4 as uid } from 'uuid'
import { userDetailValidationSchema } from '../Helper/validation'
import { DatabaseHelper } from '../DatabaseHelper'
import jwt from 'jsonwebtoken'

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
    }
}


export const registerUser = async(req:ExtendedRequest,  res:Response)=>{
    try {
        let UserId =uid()
        const{Name,Email, Password} = req.body
        const {error}=userDetailValidationSchema.validate(req.body)
        if(error){
            return res.status(404).json(error.details[0].message)
        }
        let hashedPassword= await bcrypt.hash(Password,8)
         await DatabaseHelper.exec('RegisterUser',{Name,Email,Password:hashedPassword})
         return res.status(201).json({message:"User Registered Successfully!!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const loginUser = async(req:Request, res:Response)=>{
    try {
        const {Email,Password} = req.body
        let user=await   (await DatabaseHelper.query(`SELECT * FROM Users WHERE Email='${Email}'`)).recordset

        
        if(!user[0]){
            return res.status(404).json({message:"User not found"})
        }

        let validPsd= await bcrypt.compare(Password,user[0].Password)
        if(!validPsd){
            return res.status(401).json({message:"User not found"})
        }
        
        const payload = user.map(person=>{
            const {EmailSent,ProfileProfile,Resume,Bio,...rest}= person
            return rest
        })
        
        const token = jwt.sign(payload[0],process.env.SECRET_KEY as string ,{expiresIn:"30000s"})
        return res.status(201).json({message:"Logged In Successfull",token, Name:payload[0].Name})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}