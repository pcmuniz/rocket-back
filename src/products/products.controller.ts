import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async postProduct(@Body() postData: Product):Promise<Product>{
    return this.productsService.createProduct(postData)
  }

  @Get()
  async getAllProduct():Promise<Product[]>{
    return this.productsService.getAllProduct()
  }

  @Get(':id')
  async getProduct(@Param('id') id:number):Promise<Product | null>{
    return this.productsService.getProduct(id)
  }

  @Patch(':id')
  async updateProduct(@Param('id') id:number, @Body() postData: Product):Promise<Product>{
    return this.productsService.updateProduct(id,postData)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id:number):Promise<Product>{
    return this.productsService.deleteProduct(id)
  }
}
