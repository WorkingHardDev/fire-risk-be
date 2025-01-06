import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { RequestUser } from '../types/request-user.type';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  async getProducts() {
    return this.stripeService.getProducts();
  }

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Body() body: CreateCheckoutSessionDto,
    @Req() req: RequestUser,
  ) {
    const { userId } = req.user;

    return this.stripeService.createCheckoutSession(userId, body.productId);
  }

  @Post('webhook')
  async webhook(@Body() body: Buffer, @Req() req: Request) {
    const signature = req.headers['stripe-signature'];

    return this.stripeService.webhook(body, signature);
  }
}
