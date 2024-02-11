
import joi from 'joi'


export const userDetailValidationSchema= joi.object({
       
        Name: joi.string().required(),
        Email: joi.string().required(),
        Password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})