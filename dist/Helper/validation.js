"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userDetailValidationSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Email: joi_1.default.string().required(),
    Password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});
