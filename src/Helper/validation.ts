

import joi from 'joi'


export const userDetailValidationSchema= joi.object({
       
        Name: joi.string().required(),
        Email: joi.string().required(),
        Password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})



export const jobValidationSchema = joi.object({

    Title: joi.string().trim().min(3).max(255).required().description('The title of the job posting'),

    Description: joi.string().trim().min(10).required().description('Detailed description of the job posting'),

    Location: joi.string().trim().min(2).max(255).required().description('Location where the job is based'),

    SalaryRange: joi.string().trim()// This regex is for a basic salary range or amount format, adjust as necessary
        .required()
        .description('Salary range for the job, can be a range or a fixed amount'),

    Type: joi.string().trim().valid('Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship').required().description('Employment type for the job'),

    PostedDate: joi.date().iso().required().description('The date when the job was posted'),

    ExpiryDate: joi.date().iso().greater(joi.ref('PostedDate')).required().description('The expiry date for the job posting, must be after the posted date')
}).with('PostedDate', 'ExpiryDate');



export const companyValidationSchema = joi.object({
    
    Name: joi.string().required().min(2).max(100), 
    Description: joi.string().required().min(5).max(500), 
    Industry: joi.string().required().min(2).max(50),
    Logo: joi.string().uri().optional(),
    ContactInfo: joi.string().required().min(2).max(500),
    Email: joi.string().required(),
    Password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()


  })


  export const jobCategoryValidationSchema = joi.object({
    Name: joi.string().required().min(2).max(100)
      .description('The name of the job category, must be between 2 and 100 characters long.'),
    Description: joi.string().required().min(5).max(500)
      .description('The description of the job category, must be between 5 and 500 characters long.')
  });


  export const jobApplicationValidationSchema = joi.object({
    CoverLetter: joi.string().required(),
  });