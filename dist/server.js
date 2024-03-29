"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const userRoute_1 = __importDefault(require("./Routes/userRoute"));
const jobRoute_1 = __importDefault(require("./Routes/jobRoute"));
const campanyRoute_1 = __importDefault(require("./Routes/campanyRoute"));
const CategoryRoute_1 = __importDefault(require("./Routes/CategoryRoute"));
const adminRoute_1 = __importDefault(require("./Routes/adminRoute"));
const ApplicationRoute_1 = __importDefault(require("./Routes/ApplicationRoute"));
const SERVER = (0, express_1.default)();
const PORT = 4000;
SERVER.use((0, express_1.json)());
SERVER.use((0, cors_1.default)());
SERVER.use('/user', userRoute_1.default);
SERVER.use('/jobs', jobRoute_1.default);
SERVER.use('/companies', campanyRoute_1.default);
SERVER.use('/category', CategoryRoute_1.default);
SERVER.use('/admin', adminRoute_1.default);
SERVER.use('/apply', ApplicationRoute_1.default);
SERVER.listen(PORT, () => {
    console.log(`Database connected to: http://localhost${PORT}`);
});
