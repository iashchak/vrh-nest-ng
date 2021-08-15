import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from 'server/users/entities/user.entity';
import { UsersService } from 'server/users/users.service';
import { JwtService } from './jwt.service';

export enum Provider {
  VKONTAKTE = 'vkontakte',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = 'VERY_SECRET_KEY'; // <- replace this with your secret key

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  /**
   * Generating new JWT tokens to keep the user authenticated
   *
   * @param token
   * @returns data - The new access and the refresh token to authenticate the user and the user
   */
  async refreshToken(token: string): Promise<any> {
    const user: User = await this.jwtService.verify(token);
    const tokens = await this.jwtService.generateToken(user);

    return { tokens, user };
  }
}
