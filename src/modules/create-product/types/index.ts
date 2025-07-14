// src/types.ts
export interface ItemFormValues {
  name: string;
  brand: string;
  category: string;
  storage: string;
  sellPrice: number;
  Quantity: number;
  specifications: {
    processor?: string;
    battery?: string;
    screenSize?: string;
    os?: string;
    camera?: string;
    sim?: string;
    weight?: string;
    color?: string;
    ram?: string;
  };
  stock: {
    quantity?: string;
    warranty?: string;
    rating?: string;
    reviewsCount?: string;
    isFeatured?: string;
    addedDate?: string;
  };
}
