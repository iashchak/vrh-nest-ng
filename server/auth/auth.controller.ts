import { Get, Req, Res, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
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

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  protectedResource() {
    return 'JWT is working!';
  }
}
