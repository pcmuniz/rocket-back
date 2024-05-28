import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [PrismaClient],
})
export class ProductsModule {}
