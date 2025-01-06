import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { UpdateUserDto } from './dto/updata-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get user' })
  public async get(@Req() req: RequestUser) {
    const { userId } = req.user;

    const user = await this.usersService.findById(userId);
    delete user.password;
    return user;
  }

  @Patch()
  @ApiOperation({ summary: 'Update user' })
  public async update(@Body() body: UpdateUserDto, @Req() req: RequestUser) {
    const { userId } = req.user;

    return this.usersService.update(userId, body);
  }

  @Get('assessments/use')
  public async useAssessment(@Req() req: RequestUser) {
    const { userId } = req.user;

    return this.usersService.useAssessment(userId);
  }

  @Get('reviews/use')
  public async useReview(@Req() req: RequestUser) {
    const { userId } = req.user;

    return this.usersService.useReview(userId);
  }
}
