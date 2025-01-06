import { registerAs } from '@nestjs/config';
import Stripe from 'stripe';

export default registerAs('stripe', () => {
  const stripeConfig: Stripe.StripeConfig = {
    apiVersion: '2024-11-20.acacia',
  };

  return {
    apiKey: process.env.STRIPE_API_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    config: stripeConfig,
  };
});
