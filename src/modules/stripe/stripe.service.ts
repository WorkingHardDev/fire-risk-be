import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
import { STRIPE_CLIENT } from './constants';

@Injectable()
export class StripeService {
  constructor(
    @Inject(STRIPE_CLIENT) private stripeClient: Stripe,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async createCheckoutSession(userId: string, productId: string) {
    const product = await this.stripeClient.products.retrieve(productId);
    const prices = await this.stripeClient.prices.list({
      product: productId,
    });
    const price = prices.data[0];
    // console.log('price', price);
    // console.log('product', product);

    const session = await this.stripeClient.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/success`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
      metadata: {
        userId,
        ...product.metadata,
      },
    });

    return { redirectUrl: session.url };
  }

  async webhook(body: Buffer, signature: string) {
    let event: Stripe.Event;

    try {
      event = this.stripeClient.webhooks.constructEvent(
        body,
        signature,
        this.configService.get('stripe.webhookSecret'),
      );
    } catch (err) {
      console.log(err);
    }

    console.log('event.type', event.type);

    if (event.type === 'checkout.session.completed') {
      const { metadata } = event.data.object;
      console.log('metadata', metadata);

      if (metadata.assessments) {
        await this.usersService.addAssessmentsAmount(
          metadata.userId,
          +metadata.assessments,
        );
      } else if (metadata.reviews) {
        await this.usersService.addReviewsAmount(
          metadata.userId,
          +metadata.reviews,
        );
      }
    }
  }

  async getProducts() {
    const products = await this.stripeClient.products.list({ active: true });
    const prices = await this.stripeClient.prices.list({ active: true });

    return products.data.map((product) => {
      const productPrices = prices.data.filter(
        (price) => price.product === product.id,
      );
      return {
        id: product.id,
        name: product.name,
        price: {
          amount: productPrices[0].unit_amount,
          currency: productPrices[0].currency,
        },
      };
    });
  }
}
