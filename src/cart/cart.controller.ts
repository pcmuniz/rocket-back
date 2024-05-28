import { Controller, Post, Body, Param, Delete, Get, ParseIntPipe, Patch } from '@nestjs/common';
import { Prisma, CartItem } from '@prisma/client';
import { CartService } from './cart.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart() {
    return this.cartService.createCart();
  }

  @Post(':cartId/items')
  async postItem(@Param('cartId', ParseIntPipe) cartId: number, @Body() postData: CartItem) {
    return this.cartService.postItem(cartId, postData);
  }

  @Patch('items/:id')
  async updateItem(@Param('id', ParseIntPipe) id: number, @Body() postData: CartItem): Promise<CartItem> {
    return this.cartService.updateItem(id, postData);
  }

  @Delete('items/:id')
  async removeItem(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeItem(id);
  }

  @Get(':cartId')
  async getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.getCart(cartId);
  }

  @Post(':cartId/checkout')
  async checkout(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.cartService.checkout(cartId);
  }
}