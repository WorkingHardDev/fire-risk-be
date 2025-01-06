import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { UsersService } from '../users/users.service';
import { SupportMessageDto } from './dto/support-message.dto';
import { MailService } from './mail.service';

@Controller('mails')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/support-message')
  public async supportMessage(
    @Req() req: RequestUser,
    @Body() body: SupportMessageDto,
  ) {
    const { userId } = req.user;

    const user = await this.usersService.findById(userId);

    return this.mailService.sendSupportMessage(user.email, body);
  }
}
