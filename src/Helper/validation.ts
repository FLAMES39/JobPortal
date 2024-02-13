
import joi from 'joi'


export const userDetailValidationSchema= joi.object({
       
        Name: joi.string().required(),
        Email: joi.string().required(),
        Password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

import Joi from 'joi';

export const jobValidationSchema = Joi.object({
    CompanyID: Joi.number().integer().positive().required().description('Unique identifier for the company posting the job'),

    CategoryID: Joi.number().integer().positive().required().description('Unique identifier for the job category'),

    Title: Joi.string().trim().min(3).max(255).required().description('The title of the job posting'),

    Description: Joi.string().trim().min(10).required().description('Detailed description of the job posting'),

    Location: Joi.string().trim().min(2).max(255).required().description('Location where the job is based'),

    SalaryRange: Joi.string().trim().regex(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/) // This regex is for a basic salary range or amount format, adjust as necessary
        .required()
        .description('Salary range for the job, can be a range or a fixed amount'),

    Type: Joi.string().trim().valid('Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship').required().description('Employment type for the job'),

    PostedDate: Joi.date().iso().required().description('The date when the job was posted'),

    ExpiryDate: Joi.date().iso().greater(Joi.ref('PostedDate')).required().description('The expiry date for the job posting, must be after the posted date')
}).with('PostedDate', 'ExpiryDate'); // Ensure ExpiryDate comes after PostedDate
