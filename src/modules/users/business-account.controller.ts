import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { BusinessAccountService } from './business-account.service';
import { CreateBusinessAccountDto } from './dto/create-business-account.dto';
import { UpdateBusinessAccountDto } from './dto/update-business-account.dto';

@ApiTags('Business Account')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('business-accounts')
export class BusinessAccountController {
  constructor(
    private readonly businessAccountService: BusinessAccountService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a business account' })
  public async create(
    @Body() body: CreateBusinessAccountDto,
    @Req() req: RequestUser,
  ) {
    const { userId } = req.user;

    console.log('create business account userId', userId);
    return this.businessAccountService.create(userId, body);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a business account' })
  public async update(
    @Param('id') id: string,
    @Body() body: UpdateBusinessAccountDto,
  ) {
    return this.businessAccountService.update(id, body);
  }
}
