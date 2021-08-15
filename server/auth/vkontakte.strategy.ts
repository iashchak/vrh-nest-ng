import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService, Provider } from './auth.service';

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, 'vkontakte') {
  constructor(private readonly authService: AuthService) {
    super({
      authorizationURL: 'https://oauth.vk.com/authorize',
      tokenURL: 'https://oauth.vk.com/access_token',
      clientID: process.env.AUTH_VK_CLIENT_ID, // <- Replace this with your client id
      clientSecret: process.env.AUTH_VK_TOKEN, // <- Replace this with your client secret
      callbackURL: `${process.env.DOMAIN}/api/auth/vkontakte/callback`,
      scope: ['profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    params: unknown,
    profile: any
  ): Promise<any> {
    const jwt: string = await this.authService.validateOAuthLogin(
      profile.id,
      Provider.VKONTAKTE
    );
    return { jwt };
  }
}
