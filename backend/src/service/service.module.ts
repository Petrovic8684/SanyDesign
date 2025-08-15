import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService, JwtService],
})
export class ServiceModule {}
