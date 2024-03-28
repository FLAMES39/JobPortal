
import { number } from "joi";
import { sqlConfig } from "../Config";
import mssql from 'mssql'


export class DatabaseHelper{

    private static pool:Promise<mssql.ConnectionPool>=mssql.connect(sqlConfig)


    private static addInputToRequest(request: mssql.Request, data: { [x: string]: string | number | null } = {}) {
        const keys = Object.keys(data);
        keys.forEach(KeyName => {
            const value = data[KeyName];
            // Check if the value is null before adding it to the request
            if (value !== null) {
                request.input(KeyName, value);
            }
        });
        return request;
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
        Name:string,
        Email:string,
        contactInfo:string,
        ApplicationDate: string,
        Status: string,
        CoverLetter: string,
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
    
    static async insertEmploymentHistory(employmentData: any): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();
        // Add input parameters to the request based on employmentData
        // Execute the query or stored procedure to insert employment history
    }

    static async insertEducationHistory(educationData: any): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();
        // Add input parameters to the request based on educationData
        // Execute the query or stored procedure to insert education history
    }

    static async insertSkill(skillData: any): Promise<void> {
        const pool = await this.pool;
        const request = pool.request();
        // Add input parameters to the request based on skillData
        // Execute the query or stored procedure to insert skill
    }
}