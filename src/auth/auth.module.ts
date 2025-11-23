import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionModule } from 'src/session/session.module';
import { UserModule } from 'src/user/user.module';
import { TokenService } from './token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GuestOnlyGuard } from './guards/guestOnly.guard';
import { AuthOnlyGuard } from './guards/authOnly.guard';
import { IncludeRefreshGuard } from './guards/refresh.guard';

@Module({
  imports: [UserModule, SessionModule, JwtModule.register({})],
  providers: [
    TokenService,
    AuthService,
    GuestOnlyGuard,
    AuthOnlyGuard,
    IncludeRefreshGuard,
  ],
  controllers: [AuthController],
  exports: [AuthModule],
})
export class AuthModule {}
