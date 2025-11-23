import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from 'src/session/session.service';
import { UserService } from 'src/user/user.service';
import { CreateSessionData, RotateSessionData } from './types/authTypes';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';
import { LoginDTO, LogoutDTO, RegisterDTO, UserDTO } from './types/AuthDTO';
import { plainToInstance } from 'class-transformer';
import { User } from '@prisma/client';
const invalidTokenErr = new UnauthorizedException(
  'Invalid or expired refresh token',
);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private tokenService: TokenService,
  ) {}

  async login(
    data: LoginDTO,
  ): Promise<{ refreshToken: string; accessToken: string; user: UserDTO }> {
    const user: User | null = await this.userService.findUser({
      email: data.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async register(
    data: RegisterDTO,
  ): Promise<{ refreshToken: string; accessToken: string; user: UserDTO }> {
    const isUserExist = await this.userService.findUser({ email: data.email });
    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.tokenService.hashValue(data.password);

    const user: User = await this.userService.userCreate({
      ...data,
      password: hashedPassword,
    });
    if (!user) {
      throw new InternalServerErrorException();
    }

    return this.buildAuthResponse(user);
  }

  async refreshTokens(reqRefreshToken: string) {
    const oldPayload =
      await this.tokenService.verifyRefreshToken(reqRefreshToken);
    if (!oldPayload) {
      throw invalidTokenErr;
    }

    const user = await this.userService.findUser({ email: oldPayload.email });
    if (!user) {
      throw invalidTokenErr;
    }
    const newPayload = this.tokenService.generatePayload(user);
    const accessToken = await this.tokenService.generateAccessToken(newPayload);

    const { refreshToken } = await this.rotateSession({
      user: user,
      oldJti: oldPayload.jti,
      refreshToken: reqRefreshToken,
      payload: newPayload,
    });

    return { refreshToken, accessToken };
  }

  async logout(data: LogoutDTO) {
    const payload = await this.tokenService.verifyRefreshToken(
      data.refreshToken,
    );
    if (!payload) throw invalidTokenErr;

    const removedSession = await this.sessionService.deleteSession({
      jti: payload.jti,
    });
    if (!removedSession) throw new InternalServerErrorException();

    return true;
  }

  private async createSession(data: CreateSessionData): Promise<string> {
    const refreshToken = await this.tokenService.generateRefreshToken(
      data.payload,
    );

    const hashedRefreshToken = await this.tokenService.hashValue(refreshToken);

    const expireAt = this.getSessionExpireDate();
    const createdSession = await this.sessionService.createSession({
      jti: data.payload.jti,
      hashedRefreshToken,
      expireAt,
      user: { connect: { id: data.user.id } },
    });
    if (!createdSession) {
      throw new InternalServerErrorException();
    }
    return refreshToken;
  }

  private async rotateSession(
    data: RotateSessionData,
  ): Promise<{ refreshToken: string }> {
    const session = await this.sessionService.getSession({ jti: data.oldJti });

    if (!session) throw invalidTokenErr;

    const isValid = await bcrypt.compare(
      data.refreshToken,
      session.hashedRefreshToken,
    );

    if (!isValid) {
      throw invalidTokenErr;
    }

    const refreshToken = await this.tokenService.generateRefreshToken(
      data.payload,
    );

    const hashedRefreshToken = await this.tokenService.hashValue(refreshToken);
    const expireAt = this.getSessionExpireDate();

    const updatedSession = await this.sessionService.updateSession(
      { jti: data.oldJti },
      { hashedRefreshToken, expireAt, jti: data.payload.jti },
    );

    if (!updatedSession) {
      throw new InternalServerErrorException();
    }

    return { refreshToken };
  }

  private async buildAuthResponse(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserDTO;
  }> {
    const responseUser: UserDTO = plainToInstance(UserDTO, user, {
      excludeExtraneousValues: true,
    });
    const payload = this.tokenService.generatePayload(user);
    const refreshToken = await this.createSession({ user, payload });
    const accessToken = await this.tokenService.generateAccessToken(payload);
    return { accessToken, refreshToken, user: responseUser };
  }

  private readonly SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
  private getSessionExpireDate(): Date {
    return new Date(Date.now() + this.SESSION_TTL);
  }
}
