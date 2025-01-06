import { SendGridService } from '@anchan828/nest-sendgrid';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { SupportMessageDto } from './dto/support-message.dto';

@Injectable()
export class MailService {
  private client: Twilio;

  constructor(
    private readonly configService: ConfigService,
    private readonly sendGridService: SendGridService,
  ) {
    this.client = new Twilio(
      this.configService.get('twilio.twilio.accountSid'),
      this.configService.get('twilio.twilio.authToken'),
    );
  }

  public async sendSupportMessage(email: string, body: SupportMessageDto) {
    const twilioConfig = this.configService.get('twilio');

    try {
      const message = await this.sendGridService.send({
        to: email,
        // to: 'serhii.work.freelance@gmail.com',
        from: `Report System <${twilioConfig.sendgrid.fromEmail}>`,
        templateId: twilioConfig.sendgrid.supportTemplateId,
        dynamicTemplateData: {
          email,
          message: body.message,
        },
      });

      console.log('support message', message);

      return { message: 'Support message sent' };
    } catch (error) {
      console.log('sendSupportMessage error', error);
      throw new BadRequestException('Failed to send support message');
    }
  }

  public async sendCodeToEmail(receiver: string) {
    const twilioConfig = this.configService.get('twilio');
    const message = await this.client.verify.v2
      .services(twilioConfig.twilio.serviceSid)
      .verifications.create({
        channel: 'email',
        channelConfiguration: {
          template_id: twilioConfig.sendgrid.recoveryTemplateId,
          subject: 'Your Verification Code',
          from: twilioConfig.sendgrid.fromEmail,
        },
        to: receiver,
      });

    console.log('message', message);
    return { message: 'Verification code sent' };
  }

  public async verifyCode(receiver: string, code: string) {
    const twilioConfig = this.configService.get('twilio');
    try {
      const checkCode = await this.client.verify.v2
        .services(twilioConfig.twilio.serviceSid)
        .verificationChecks.create({ to: receiver, code });

      console.log('verifyCode message', checkCode);
      return checkCode.valid;
    } catch (error) {
      console.log('verifyCode error', error);
      return false;
    }
  }
}
