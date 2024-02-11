"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCcontroller_1 = require("../Controllers/userCcontroller");
const userRoute = (0, express_1.Router)();
userRoute.post('', userCcontroller_1.registerUser);
userRoute.post('/:login', userCcontroller_1.loginUser);
exports.default = userRoute;
