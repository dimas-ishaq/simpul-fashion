import { OrderItemTypes } from "./Order";
import { CategoryTypes } from "./Category";
import { StoreTypes } from "./Store";
export type ProductCategoryTypes = {
  productId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  category: CategoryTypes[] | CategoryTypes;
};

export type ProductImageTypes = {
  id: string;
  url: string;
  createdAt: string;
  productId: string;
};

export type ProductTypes = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
  categories: ProductCategoryTypes[];
  images: ProductImageTypes[];
  orderItems: OrderItemTypes[];
};

export type AddProductTypes = Omit<
  ProductTypes,
  "id" | "createdAt" | "updatedAt"
> & {
  description?: string;
  images: (File | null)[];
};

export type ProductTableTypes = Omit<ProductTypes, "updatedAt" | "storeId">;
export type ProductTypesResponse = ProductTypes & {
  store: Pick<StoreTypes, "name" | "isVerified">;
  _count: {
    orderItem: number;
  };
};
