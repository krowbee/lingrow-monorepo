import { Injectable } from '@nestjs/common';
import { Prisma, Session } from '@prisma/client';
import PrismaService from 'src/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
  ): Promise<Session | null> {
    return this.prisma.session.findUnique({ where: sessionWhereUniqueInput });
  }

  async createSession(
    sessionCreateInput: Prisma.SessionCreateInput,
  ): Promise<Session> {
    return this.prisma.session.create({ data: sessionCreateInput });
  }

  async updateSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
    sessionUpdateInput: Prisma.SessionUpdateInput,
  ): Promise<Session> {
    return this.prisma.session.update({
      where: sessionWhereUniqueInput,
      data: sessionUpdateInput,
    });
  }

  async deleteSession(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
  ): Promise<Session> {
    return this.prisma.session.delete({ where: sessionWhereUniqueInput });
  }
}
