export interface listProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  storage: string;
  sellPrice: number;
  Quantity: number;

  specifications?: {
    ram: string;
    battery: string;
    screenSize: string;
    processor: string;
    os: string;
    camera: string;
    sim: string;
    weight: string;
    color: string;
  } | null; 

  stock?: {
    quantity: number;
    warranty: string;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    addedDate: string;
  } | null;
}

export interface ProductResponse {
  total: number;
  data: listProduct[];
}


export type ProductQueryParams = {
  name?: string;
  page?: number;
  category?: string;
  brand?: string;
};