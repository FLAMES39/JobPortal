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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseHelper = void 0;
const Config_1 = require("../Config");
const mssql_1 = __importDefault(require("mssql"));
class DatabaseHelper {
    static addInputToRequest(request, data = {}) {
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
    static exec(storedProcedure, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = (yield DatabaseHelper.pool).request();
            request = this.addInputToRequest(request, data);
            return request.execute(storedProcedure);
        });
    }
    static query(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield DatabaseHelper.pool).request().query(queryString);
        });
    }
    static insertApplication(applicationData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Exclude properties with null values
            const data = Object.entries(applicationData).reduce((acc, [key, value]) => {
                if (value !== null) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            // Now 'data' doesn't contain null values and matches the expected type
            const result = yield DatabaseHelper.exec('insertApplication', data);
            // Assuming the stored procedure returns the ID of the inserted application
            return result.recordset[0].ApplicationID;
        });
    }
    static insertEmploymentHistory(employmentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield this.pool;
            const request = pool.request();
            // Add input parameters to the request based on employmentData
            // Execute the query or stored procedure to insert employment history
        });
    }
    static insertEducationHistory(educationData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield this.pool;
            const request = pool.request();
            // Add input parameters to the request based on educationData
            // Execute the query or stored procedure to insert education history
        });
    }
    static insertSkill(skillData) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield this.pool;
            const request = pool.request();
            // Add input parameters to the request based on skillData
            // Execute the query or stored procedure to insert skill
        });
    }
}
exports.DatabaseHelper = DatabaseHelper;
DatabaseHelper.pool = mssql_1.default.connect(Config_1.sqlConfig);
