import { SendGridModule } from '@anchan828/nest-sendgrid';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersModule } from '../users/users.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

dotenv.config();
@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    UsersModule,
  ],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
