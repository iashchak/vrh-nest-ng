import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';

import { WsException } from '@nestjs/websockets';
import { UsersService } from 'server/users/users.service';
import { User } from 'server/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Generates a new JWT token
   *
   * @param {User} user - The user to create the payload for the JWT
   * @returns {Promise} tokens - The access and the refresh token
   */
  async generateToken(user: User): Promise<any> {
    const payload = {
      sub: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      iss: os.hostname(),
    };
    const accessToken = await jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET', ''),
      {
        expiresIn: 30,
      }
    );
    const refreshToken = await jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET', ''),
      {
        expiresIn: 30,
      }
    );

    return { accessToken, refreshToken };
  }

  /**
   * Validates the token
   *
   * @param {string} token - The JWT token to validate
   * @param {boolean} isWs - True to handle WS exception instead of HTTP exception (default: false)
   */
  async verify(token: string, isWs: boolean = false): Promise<User> {
    try {
      const payload = <any>(
        jwt.verify(token, this.configService.get<string>('JWT_SECRET', ''))
      );
      const user = await this.usersService.getOne(payload.sub._id);

      if (!user) {
        if (isWs) {
          throw new WsException('Unauthorized access');
        } else {
          throw new HttpException(
            'Unauthorized access',
            HttpStatus.BAD_REQUEST
          );
        }
      }

      return user;
    } catch (err) {
      if (isWs) {
        throw new WsException(err.message);
      } else {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
