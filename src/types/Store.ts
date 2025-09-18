import { ProductTypes } from "./Product";
import { OrderTypes } from "./Order";
import { UserTypes } from "./User";

type ProductOrderCount = {
  products: number;
  orders: number;
};

export type StoreTypes = {
  id: string;
  name: string;
  slug: string;
  userId: string;
  description: string;
  address: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  products: ProductTypes[];
  orders: OrderTypes[];
};

export type StoreInputTypes = Pick<
  StoreTypes,
  "id" | "name" | "description" | "address"
>;

export type StoreTableTypes = Omit<StoreTypes, "updatedAt"> & {
  _count: ProductOrderCount;
  user: Partial<UserTypes>;
};
