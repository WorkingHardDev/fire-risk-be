import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersModule } from '../users/users.module';
import { STRIPE_CLIENT } from './constants';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  providers: [
    StripeService,
    {
      provide: STRIPE_CLIENT,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const stripeConfig = configService.get('stripe.config');
        const apiKey = configService.get('stripe.apiKey');

        if (!apiKey || !stripeConfig) {
          throw new Error('STRIPE_API_KEY is not defined');
        }

        return new Stripe(apiKey, stripeConfig);
      },
    },
  ],
  controllers: [StripeController],
  imports: [UsersModule],
})
export class StripeModule {}
