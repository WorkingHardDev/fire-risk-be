import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigurationModule } from './configuration/configuration.module';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigurationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const result = configService.get<TypeOrmModuleOptions>('database');
        if (!result) {
          throw new Error('Database configuration is missing');
        }
        return result;
      },
    }),
    AuthModule,
    UsersModule,
    AssessmentsModule,
    MailModule,
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
