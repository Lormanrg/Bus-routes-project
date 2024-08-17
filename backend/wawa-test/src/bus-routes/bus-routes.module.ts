import { Module } from '@nestjs/common';
import { BusRoutesService } from './bus-routes.service';
import { BusRoutesResolver } from './bus-routes.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BusRoutesResolver, BusRoutesService, PrismaService],
  imports: [PrismaModule, HttpModule],
})
export class BusRoutesModule {}
