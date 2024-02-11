"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../env') });
const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({ message: "Unauthorised" });
        }
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.infor = decodedData;
        return res.status(201).json({ massage: token });
    }
    catch (error) {
        return res.status(403).json({ message: error.message });
    }
    next();
};
exports.verifyToken = verifyToken;
