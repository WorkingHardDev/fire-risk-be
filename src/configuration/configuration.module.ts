import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { database, jwt, s3, stripe, twilio } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, jwt, s3, twilio, stripe],
      envFilePath: '../.env',
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
