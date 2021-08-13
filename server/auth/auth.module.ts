import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { VkontakteStrategy } from './auth/vkontakte.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, VkontakteStrategy, JwtStrategy],
})
export class AuthModule {}
