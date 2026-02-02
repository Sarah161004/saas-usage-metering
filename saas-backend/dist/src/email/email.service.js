"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodejs_1 = __importDefault(require("@emailjs/nodejs"));
let EmailService = class EmailService {
    async sendSoftLimitEmail(toEmail, month, used, limit) {
        console.log('🔔🔔🔔 SOFT LIMIT EMAIL METHOD CALLED 🔔🔔🔔');
        console.log('To:', toEmail);
        console.log('Month:', month);
        console.log('Used:', used, '/', limit);
        try {
            const res = await nodejs_1.default.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID_SOFT, {
                to_email: toEmail,
                month,
                used,
                limit,
            }, {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            });
            console.log('✅ SOFT EMAIL SENT SUCCESSFULLY', res.status, res.text);
        }
        catch (err) {
            console.error('❌ SOFT EMAIL FAILED:', err);
        }
    }
    async sendHardLimitEmail(toEmail, month, used, limit) {
        console.log('🚨🚨🚨 HARD LIMIT EMAIL METHOD CALLED 🚨🚨🚨');
        console.log('To:', toEmail);
        console.log('Month:', month);
        console.log('Used:', used, '/', limit);
        try {
            const res = await nodejs_1.default.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID_HARD, {
                to_email: toEmail,
                month,
                used,
                limit,
            }, {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            });
            console.log('✅ HARD EMAIL SENT SUCCESSFULLY', res.status, res.text);
        }
        catch (err) {
            console.error('❌ HARD EMAIL FAILED:', err);
        }
    }
    async testEmail() {
        console.log('=== TESTING EMAIL SETUP ===');
        console.log('Service ID:', process.env.EMAILJS_SERVICE_ID);
        console.log('Template Soft:', process.env.EMAILJS_TEMPLATE_ID_SOFT);
        console.log('Template Hard:', process.env.EMAILJS_TEMPLATE_ID_HARD);
        console.log('Public Key:', process.env.EMAILJS_PUBLIC_KEY);
        console.log('Private Key:', process.env.EMAILJS_PRIVATE_KEY ? 'Set (length: ' + process.env.EMAILJS_PRIVATE_KEY.length + ')' : 'NOT SET');
        console.log('=========================');
        try {
            const res = await nodejs_1.default.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID_SOFT, {
                to_email: 'saasdemo003@gmail.com',
                month: 'January 2026',
                used: 85,
                limit: 100,
            }, {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY,
            });
            console.log('✅ TEST EMAIL SUCCESS:', res.status, res.text);
            return { success: true, status: res.status };
        }
        catch (err) {
            console.error('❌ TEST EMAIL FAILED:', err);
            return { success: false, error: err };
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)()
], EmailService);
//# sourceMappingURL=email.service.js.map