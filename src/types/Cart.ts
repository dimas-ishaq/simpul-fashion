import { ProductTypes } from "./Product";
export type CartTypes = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  cartItems: CartItemTypes[];
};

export type CartItemTypes = {
  id: string;
  cardId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItemInput = Omit<
  CartItemTypes,
  "id" | "createdAt" | "updatedAt" | "cardId"
>;

export type CartItemResponse = {
  cartItem: (CartItemTypes & {
    product: ProductTypes;
  })[];
};

export type CartItemSingleResponse = {
  item: CartItemTypes & { product: ProductTypes };
};
