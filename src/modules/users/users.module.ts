import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessAccountController } from './business-account.controller';
import { BusinessAccountService } from './business-account.service';
import { BusinessAccount } from './entities/business-account.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, BusinessAccount])],
  exports: [UsersService],
  providers: [UsersService, BusinessAccountService],
  controllers: [UsersController, BusinessAccountController],
})
export class UsersModule {}
