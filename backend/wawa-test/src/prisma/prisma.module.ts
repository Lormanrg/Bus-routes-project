import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaResolver } from './prisma.resolver';

@Module({
  providers: [PrismaResolver, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
