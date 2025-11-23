/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './types/AuthDTO';
import { AuthService } from './auth.service';
import type { CookieOptions, Request, Response } from 'express';
import { AuthOnly, GuestOnly, RequireRefreshToken } from './auth.decorators';

const cookieOptions: CookieOptions = {
  secure: false,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @GuestOnly()
  @HttpCode(200)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDTO,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(data);

    res.cookie('refreshToken', refreshToken, cookieOptions);
    return { message: 'Login succesful', accessToken, user };
  }

  @GuestOnly()
  @Post('/register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() data: RegisterDTO,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(data);

    res.cookie('refreshToken', refreshToken, cookieOptions);
    return { message: 'User created succesfully', accessToken, user };
  }

  @RequireRefreshToken()
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const reqRefreshToken: string = req.cookies.refreshToken as string;
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(reqRefreshToken);
    res.cookie('refreshToken', refreshToken, cookieOptions);
    return { message: 'Refreshed succesfully', accessToken };
  }
  @AuthOnly()
  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const reqRefreshToken: string = req.cookies.refreshToken as string;
    const result = await this.authService.logout({
      refreshToken: reqRefreshToken,
    });
    res.clearCookie('refreshToken', cookieOptions);
    return { message: 'Logout succesful', success: result };
  }
}
