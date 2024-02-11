"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
const mssql_1 = __importDefault(require("mssql"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
//config setting for the dotenv file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//confirmation setting for database
exports.sqlConfig = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 300000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};
//TEST DATABASE CONNECTION
mssql_1.default.connect(exports.sqlConfig).then(pool => {
    if (pool.connected) {
        console.log(`Database connected `);
    }
});
