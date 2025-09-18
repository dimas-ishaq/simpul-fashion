export type CategoryTypes = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryInput = Omit<
  CategoryTypes,
  "id" | "createdAt" | "updatedAt"
>;
