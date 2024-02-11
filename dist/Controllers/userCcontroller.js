"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const validation_1 = require("../Helper/validation");
const DatabaseHelper_1 = require("../DatabaseHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../env') });
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let UserId = (0, uuid_1.v4)();
        const { Name, Email, Password } = req.body;
        const { error } = validation_1.userDetailValidationSchema.validate(req.body);
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        let hashedPassword = yield bcrypt_1.default.hash(Password, 8);
        yield DatabaseHelper_1.DatabaseHelper.exec('RegisterUser', { Name, Email, Password: hashedPassword });
        return res.status(201).json({ message: "User Registered Successfully!!" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        let user = yield (yield DatabaseHelper_1.DatabaseHelper.query(`SELECT * FROM Users WHERE Email='${Email}'`)).recordset;
        if (!user[0]) {
            return res.status(404).json({ message: "User not found" });
        }
        let validPsd = yield bcrypt_1.default.compare(Password, user[0].Password);
        if (!validPsd) {
            return res.status(401).json({ message: "User not found" });
        }
        const payload = user.map(person => {
            const { EmailSent, ProfileProfile, Resume, Bio } = person, rest = __rest(person, ["EmailSent", "ProfileProfile", "Resume", "Bio"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, { expiresIn: "30000s" });
        return res.status(201).json({ message: "Logged In Successfull", token, Name: payload[0].Name });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.loginUser = loginUser;
