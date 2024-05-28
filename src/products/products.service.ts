import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAllProduct(): Promise<Product[]>{
    return this.prisma.product.findMany()
}

async getProduct(id:number): Promise<Product | null>{
    return this.prisma.product.findUnique({where: {id:Number(id)}})
}

async createProduct(data: Product): Promise<Product>{
    return this.prisma.product.create({
         data,
    })
}

async updateProduct(id:number,data:Product):Promise<Product>{
    return this.prisma.product.update({
         where: {id:Number(id)},
         data:{ name: data.name, price: data.price, category: data.category, description:data.description }
    })
}

async deleteProduct(id:number):Promise<Product>{
    return this.prisma.product.delete({
         where:{id: Number(id)}
    })
}
}