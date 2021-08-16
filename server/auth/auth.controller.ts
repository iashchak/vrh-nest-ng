import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('vkontakte')
  @UseGuards(AuthGuard('vkontakte'))
  vkontakteLogin() {}

  @Get('vkontakte/callback')
  @UseGuards(AuthGuard('vkontakte'))
  vkontakteLoginCallback(
    @Req() req: Request & { user: { jwt: string } },
    @Res() res: Response
  ) {
    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${process.env.DOMAIN}/login/success/${jwt}`);
    } else {
      res.redirect(`${process.env.DOMAIN}/login/failure`);
    }
  }

  @Post('/refresh-token')
  async refreshToken(@Req() req: Request): Promise<any> {
    const body = req.body;

    return this.authService.refreshToken(body.refreshToken);
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
