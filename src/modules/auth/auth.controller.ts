import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('/refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('/send-code')
  async sendCode(@Body('email') email: string) {
    return this.authService.sendCode(email);
  }

  @Post('/verify-code')
  async verifyCode(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.verifyCode(email, code);
  }

  @Post('/reset-password')
  @UseGuards(JwtAuthGuard)
  async resetPassword(@Body() body: ResetPasswordDto, @Req() req: RequestUser) {
    const { userId } = req.user;
    console.log('user', req.user);

    return this.authService.resetPassword(userId, body);
  }
}
