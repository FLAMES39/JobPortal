

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
    params:{
        UserID:string,
        Email:string
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

export const getAllUsers = async (req:ExtendedRequest,res:Response)=>{
    try {
       let user:Users[] = await(await DatabaseHelper.exec('getallUser')).recordset
       if(user){
            return res.status(201).json(user)
       }
       return res.status(404).json({message:"No User Found"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }

}


export const getUserByID = async (req:Request<{UserID:string}>, res:Response )=>{
    try {
        const {UserID}= req.params as {UserID:string}
        let user:Users= (await DatabaseHelper.exec('GetUserByID',{UserID:UserID})).recordset[0];

        if(user){
            return res.status(201).json(user)
        }

        return res.status(404).json({message:"user not found"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const getUserByEmail = async (req:Request<{Email:string}>, res:Response )=>{
    try {
        const {Email}= req.params as {Email:string}
        let user:Users= (await DatabaseHelper.exec('GetUserByEmail',{Email:Email})).recordset[0];

        if(user){
            return res.status(201).json(user)
        }

        return res.status(404).json({message:"user not found"})
    } catch (error:any) {
        return res.status(500).json({message:error.message})
    }
}


export const updateUser = async(req:Request ,res:Response)=>{
    try {
    
        const {Name,Password,Email,ProfilePicture,Resume,Bio}=req.body
        let hashedpassword= await bcrypt.hash(Password,10)
        let {UserID}= req.params as {UserID:string}
        let user:Users=await (await DatabaseHelper.exec('GetUserByID',{UserID})).recordset[0]
        // console.log(userid);
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        await DatabaseHelper.exec("UpdateUserDetails",{ UserID, Name, Password:hashedpassword, Email, ProfilePicture,Resume,Bio })
        return res.status(201).json({message:"User Updated"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}