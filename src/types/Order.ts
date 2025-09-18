export enum OrderStatus {
  PENDING,
  PROCESSING,
  SHIPPED,
  DELIVERED,
  CANCELLED,
}

export type OrderItemTypes = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
};

export type OrderTypes = {
  id: string;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  storeId: string;
  orderItems: OrderItemTypes[];
};
