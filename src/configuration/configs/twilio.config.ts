import { registerAs } from '@nestjs/config';

export default registerAs('twilio', () => ({
  twilio: {
    authToken: process.env.TWILIO_AUTH_TOKEN,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    serviceSid: process.env.TWILIO_SERVICE_SID,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_FROM_EMAIL,
    recoveryTemplateId: process.env.PASSWORD_RECOVERY_TEMPLATE_ID,
    supportTemplateId: process.env.SUPPORT_TEMPLATE_ID,
  },
}));
