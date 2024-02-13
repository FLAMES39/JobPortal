"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobValidationSchema = exports.userDetailValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userDetailValidationSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Email: joi_1.default.string().required(),
    Password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
const joi_2 = __importDefault(require("joi"));
exports.jobValidationSchema = joi_2.default.object({
    CompanyID: joi_2.default.number().integer().positive().required().description('Unique identifier for the company posting the job'),
    CategoryID: joi_2.default.number().integer().positive().required().description('Unique identifier for the job category'),
    Title: joi_2.default.string().trim().min(3).max(255).required().description('The title of the job posting'),
    Description: joi_2.default.string().trim().min(10).required().description('Detailed description of the job posting'),
    Location: joi_2.default.string().trim().min(2).max(255).required().description('Location where the job is based'),
    SalaryRange: joi_2.default.string().trim().regex(/^\$?\d+(,\d{3})*(\.\d{1,2})?$/) // This regex is for a basic salary range or amount format, adjust as necessary
        .required()
        .description('Salary range for the job, can be a range or a fixed amount'),
    Type: joi_2.default.string().trim().valid('Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship').required().description('Employment type for the job'),
    PostedDate: joi_2.default.date().iso().required().description('The date when the job was posted'),
    ExpiryDate: joi_2.default.date().iso().greater(joi_2.default.ref('PostedDate')).required().description('The expiry date for the job posting, must be after the posted date')
}).with('PostedDate', 'ExpiryDate'); // Ensure ExpiryDate comes after PostedDate
