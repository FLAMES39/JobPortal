
import { number } from "joi";
import { sqlConfig } from "../Config";
import mssql from 'mssql'
import {  EducationHistory, EmploymentHistory, Skills } from "../Controllers/ApplicationController";


export class DatabaseHelper{

    private static pool:Promise<mssql.ConnectionPool>=mssql.connect(sqlConfig)


 
    private static addInputToRequest(request:mssql.Request, data:{[x:string]:string|number}){
        const keys  =  Object.keys(data)
        keys.map(keyName=>{
            return request.input(keyName,data[keyName])
        })
        return request 
    }
    


     static async exec (storedProcedure:string, data:{[x:string]:string|number}={}){
        let request:mssql.Request= (await DatabaseHelper.pool).request()
        request=this.addInputToRequest(request,data)
        return request.execute(storedProcedure)
     }

     static async query (queryString:string){
        return (await DatabaseHelper.pool).request().query(queryString)
     }


     static async insertApplication(applicationData: {

        JobID: number,
        UserID:number
        Name:string,
        Email:string,
        contactInfo:string,
        JobTitle:string,
        Status: string,
        ResumePath: string | null,
        // Add other fields as necessary
    }) {
        // Exclude properties with null values
        const data = Object.entries(applicationData).reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as { [key: string]: string | number });
    
        // Now 'data' doesn't contain null values and matches the expected type
        const result = await DatabaseHelper.exec('insertApplication', data);
    
        // Assuming the stored procedure returns the ID of the inserted application
        return result.recordset[0].ApplicationID;
    }
    
    static async insertEmploymentHistory(employmentData: EmploymentHistory): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();

        request.input('ApplicationID', mssql.Int, employmentData.ApplicationID);
        request.input('CompanyName', mssql.VarChar, employmentData.CompanyName);
        request.input('JobTitle', mssql.VarChar, employmentData.JobTitle);
        request.input('Responsibilities', mssql.VarChar, employmentData.Responsibilities);
        request.input('ReasonForLeaving', mssql.VarChar, employmentData.ReasonForLeaving);
    

        await request.execute('InsertEmploymentHistory'); 
    }

    static async insertEducationHistory(educationData: EducationHistory): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();

        request.input('ApplicationID', mssql.Int, educationData.ApplicationID);
        request.input('Institution', mssql.VarChar, educationData.Institution);
        request.input('Degree', mssql.VarChar, educationData.Degree);
        request.input('FieldOfStudy', mssql.VarChar, educationData.FieldOfStudy);

        await request.execute('InsertEducationHistory'); 
    }

    static async insertSkill(skillData: Skills): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();
    
        request.input('ApplicationID', mssql.Int, skillData.ApplicationID);
        request.input('Skill', mssql.VarChar, skillData.skills); 
    
        try {
            await request.execute('InsertSkill'); 
        } catch (error) {
            console.error('Error inserting skill:', error);
            throw error; // Rethrow the error for further handling
        }
    }
    
}