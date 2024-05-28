import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Cart, CartItem } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(): Promise<Cart> {
    return this.prisma.cart.create({
      data: {},
    });
  }

  async postItem(cartId: number, cartItem: CartItem): Promise<CartItem> {
    const product = await this.prisma.product.findUnique({
      where: { id: cartItem.productId },
    });

    return this.prisma.cartItem.create({
      data: {
        cartId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      },
    });
  }

  async getItems(cartId: number): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      where: { cartId },
    });
  }

  async updateItem(id: number, updateCartItemData: Partial<CartItem>): Promise<CartItem> {
    return this.prisma.cartItem.update({
      where: { id },
      data: updateCartItemData,
    });
  }

  async removeItem(id: number): Promise<void> {
    await this.prisma.cartItem.delete({
      where: { id },
    });
  }

  async getCart(cartId: number): Promise<Cart | null> {
    return this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { product: true } } },
    });
  }

  async checkout(cartId: number): Promise<void> {
    await this.prisma.cart.delete({
      where: { id: cartId },
    });
  }
}
