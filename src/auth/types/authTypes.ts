import { UserDTO } from './AuthDTO';

export type TokenPayload = { id: number; email: string; jti: string };

export type RotateSessionData = {
  oldJti: string;
  user: UserDTO;
  refreshToken: string;
  payload: TokenPayload;
};
export type CreateSessionData = {
  user: UserDTO;
  payload: TokenPayload;
};
