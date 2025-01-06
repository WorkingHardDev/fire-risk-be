import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async useAssessment(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    let assessmentUsed = true;
    let amountOfAssessments = user.amountOfAssessments;

    if (amountOfAssessments <= 0) {
      assessmentUsed = false;
    } else {
      amountOfAssessments--;

      await this.update(user.id, {
        amountOfAssessments,
      });
    }

    return {
      assessmentUsed,
      amountOfAssessments,
    };
  }

  public async useReview(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    let reviewUsed = true;
    let amountOfReviews = user.amountOfReviews;

    if (amountOfReviews <= 0) {
      reviewUsed = false;
    } else {
      amountOfReviews--;

      await this.update(user.id, {
        amountOfReviews,
      });
    }

    return {
      reviewUsed,
      amountOfReviews,
    };
  }

  public async addAssessmentsAmount(userId: string, assessmentsAmount: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const amountOfAssessments = user.amountOfAssessments + assessmentsAmount;

    await this.update(user.id, { amountOfAssessments });
  }

  public async addReviewsAmount(userId: string, reviewsAmount: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const amountOfReviews = user.amountOfReviews + reviewsAmount;

    await this.update(user.id, { amountOfReviews });
  }

  public async resetPassword(id: string, body: ResetPasswordDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log('password', body.password);
    await this.update(user.id, { password: hashedPassword });

    return { message: 'Password reset successfully' };
  }

  async findById(id: string) {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log('id', id);
      console.log('error', error);
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, body: Partial<User>) {
    await this.userRepository.update(id, body);
    return this.findById(id);
  }

  async create(body: RegisterDto) {
    return this.userRepository.save(body);
  }
}
