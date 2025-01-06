import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessAccountDto } from './dto/create-business-account.dto';
import { UpdateBusinessAccountDto } from './dto/update-business-account.dto';
import { BusinessAccount } from './entities/business-account.entity';

@Injectable()
export class BusinessAccountService {
  constructor(
    @InjectRepository(BusinessAccount)
    private readonly businessAccountRepository: Repository<BusinessAccount>,
  ) {}

  public async create(userId: string, body: CreateBusinessAccountDto) {
    try {
      const businessAccount = await this.businessAccountRepository.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });

      console.log('businessAccount', businessAccount);

      if (businessAccount) {
        throw new BadRequestException(
          'Business account already exists for this user',
        );
      }

      return this.businessAccountRepository.save({
        user: {
          id: userId,
        },
        ...body,
      });
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(error.message);
    }
  }

  public async update(
    businessAccountId: string,
    body: UpdateBusinessAccountDto,
  ) {
    try {
      await this.businessAccountRepository.update(businessAccountId, body);
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException(error.message);
    }

    return this.businessAccountRepository.findOneBy({ id: businessAccountId });
  }
}
