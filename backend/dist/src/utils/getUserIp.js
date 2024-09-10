"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// used 'request-ip' package
const request_ip_1 = __importDefault(require("request-ip"));
const app = require('express')();
const getUserIp = (req) => {
    const clientIp = request_ip_1.default.getClientIp(req);
    console.warn(`clientIp: ${clientIp}`);
    return clientIp;
};
exports.default = getUserIp;
