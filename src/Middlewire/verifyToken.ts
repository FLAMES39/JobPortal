import { NextFunction, Request, Response } from "express";
import path from 'path'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({path:path.resolve(__dirname,'../../env')})



interface DecodedData{
    UserID:number,
    Name:string
}


interface ExtendedRequest extends Request{
    infor?:DecodedData
}


export const verifyToken = (req:ExtendedRequest,res:Response, next:NextFunction)=>{
    try {
        const token = req.headers ['token'] as string

        if(!token){
            return res.status(401).json({message:"Unauthorised"})
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY as string ) as DecodedData
        req.infor=decodedData
        return res.status(201).json({massage:token})

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}