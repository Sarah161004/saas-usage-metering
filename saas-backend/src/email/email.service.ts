// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import emailjs from '@emailjs/nodejs';

@Injectable()
export class EmailService {
  async sendSoftLimitEmail(
    toEmail: string,
    month: string,
    used: number,
    limit: number,
  ) {
    console.log('🔔🔔🔔 SOFT LIMIT EMAIL METHOD CALLED 🔔🔔🔔');
    console.log('To:', toEmail);
    console.log('Month:', month);
    console.log('Used:', used, '/', limit);
    
    try {
      const res = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID_SOFT!,
        {
          to_email: toEmail,
          month,
          used,
          limit,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY!,
          privateKey: process.env.EMAILJS_PRIVATE_KEY!,
        },
      );
      console.log('✅ SOFT EMAIL SENT SUCCESSFULLY', res.status, res.text);
    } catch (err) {
      console.error('❌ SOFT EMAIL FAILED:', err);
    }
  }

  async sendHardLimitEmail(
    toEmail: string,
    month: string,
    used: number,
    limit: number,
  ) {
    console.log('🚨🚨🚨 HARD LIMIT EMAIL METHOD CALLED 🚨🚨🚨');
    console.log('To:', toEmail);
    console.log('Month:', month);
    console.log('Used:', used, '/', limit);
    
    try {
      const res = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID_HARD!,
        {
          to_email: toEmail,
          month,
          used,
          limit,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY!,
          privateKey: process.env.EMAILJS_PRIVATE_KEY!,
        },
      );
      console.log('✅ HARD EMAIL SENT SUCCESSFULLY', res.status, res.text);
    } catch (err) {
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
      const res = await emailjs.send(
        process.env.EMAILJS_SERVICE_ID!,
        process.env.EMAILJS_TEMPLATE_ID_SOFT!,
        {
          to_email: 'saasdemo003@gmail.com',
          month: 'January 2026',
          used: 85,
          limit: 100,
        },
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY!,
          privateKey: process.env.EMAILJS_PRIVATE_KEY!,
        },
      );
      console.log('✅ TEST EMAIL SUCCESS:', res.status, res.text);
      return { success: true, status: res.status };
    } catch (err) {
      console.error('❌ TEST EMAIL FAILED:', err);
      return { success: false, error: err };
    }
  }
}