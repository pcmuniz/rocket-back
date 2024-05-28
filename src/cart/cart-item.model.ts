import { Prisma } from "@prisma/client";

export class CartItem implements Prisma.CartItemCreateInput {
    product: Prisma.ProductCreateNestedOneWithoutCartItemInput;
    cart: Prisma.CartCreateNestedOneWithoutItemsInput;
    productId: number;
    quantity: number;
}