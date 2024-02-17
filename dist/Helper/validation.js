"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationValidationSchema = exports.jobCategoryValidationSchema = exports.companyValidationSchema = exports.jobValidationSchema = exports.userDetailValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userDetailValidationSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Email: joi_1.default.string().required(),
    Password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
exports.jobValidationSchema = joi_1.default.object({
    CompanyID: joi_1.default.number().integer().positive().required().description('Unique identifier for the company posting the job'),
    CategoryID: joi_1.default.number().integer().positive().required().description('Unique identifier for the job category'),
    Title: joi_1.default.string().trim().min(3).max(255).required().description('The title of the job posting'),
    Description: joi_1.default.string().trim().min(10).required().description('Detailed description of the job posting'),
    Location: joi_1.default.string().trim().min(2).max(255).required().description('Location where the job is based'),
    SalaryRange: joi_1.default.string().trim() // This regex is for a basic salary range or amount format, adjust as necessary
        .required()
        .description('Salary range for the job, can be a range or a fixed amount'),
    Type: joi_1.default.string().trim().valid('Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship').required().description('Employment type for the job'),
    PostedDate: joi_1.default.date().iso().required().description('The date when the job was posted'),
    ExpiryDate: joi_1.default.date().iso().greater(joi_1.default.ref('PostedDate')).required().description('The expiry date for the job posting, must be after the posted date')
}).with('PostedDate', 'ExpiryDate');
exports.companyValidationSchema = joi_1.default.object({
    Name: joi_1.default.string().required().min(2).max(100),
    Description: joi_1.default.string().required().min(5).max(500),
    Industry: joi_1.default.string().required().min(2).max(50),
    Logo: joi_1.default.string().uri().optional(),
    ContactInfo: joi_1.default.string().required().min(2).max(500)
});
exports.jobCategoryValidationSchema = joi_1.default.object({
    Name: joi_1.default.string().required().min(2).max(100)
        .description('The name of the job category, must be between 2 and 100 characters long.'),
    Description: joi_1.default.string().required().min(5).max(500)
        .description('The description of the job category, must be between 5 and 500 characters long.')
});
exports.jobApplicationValidationSchema = joi_1.default.object({
    jobID: joi_1.default.number().required(),
    UserID: joi_1.default.number().required(),
    CoverLetter: joi_1.default.string().required(),
    ApplicationDate: joi_1.default.date().required(), // Validates a date
    Status: joi_1.default.string().valid('Applied', 'Not Applied').required(),
});
