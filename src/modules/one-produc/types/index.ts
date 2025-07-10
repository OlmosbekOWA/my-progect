export interface Specifications {
  ram?: string | null;
  processor?: string | null;
  battery?: string | null;
  screenSize?: string | null;
  os?: string | null;
  camera?: string | null;
  sim?: string | null;
  weight?: string | null;
  color?: string | null;
}

export interface StockInfo {
  quantity?: number;
  warranty?: string;
  rating?: number;
  reviewsCount?: number;
  isFeatured?: boolean;
  addedDate?: string;
}

export interface Item {
  id: number;
  name: string;
  brand: string;
  category: string;
  imageUrl?: string;
  storage?: string;
  sellPrice: number;
  Quantity: number;
  specifications?: Specifications | null;
  stock?: StockInfo | null;
}

export interface EditItemModalProps {
  visible: boolean;
  onCancel: () => void;
  item: Item | null;
  onSave: () => void;
}
