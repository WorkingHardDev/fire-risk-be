import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log('configService', configService.get('jwt'));
        return {
          global: true,
          secret: configService.get('jwt.accessSecret'),
          signOptions: {
            expiresIn: configService.get('jwt.accessExpiresIn'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService, JwtStrategy],
  exports: [JwtService],
})
export class JwtModule {}
