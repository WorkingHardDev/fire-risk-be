import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
  imports: [UsersModule, JwtModule, MailModule],
})
export class AuthModule {}
