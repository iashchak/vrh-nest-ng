import { Module } from '@nestjs/common';
import { UsersModule } from 'server/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { VkontakteStrategy } from './vkontakte.strategy';

@Module({
  imports: [UsersModule],
  providers: [
    AuthController,
    AuthService,
    JwtService,
    VkontakteStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
