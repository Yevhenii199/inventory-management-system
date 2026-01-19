export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: { start: string; end: string };
  price: { value: number; symbol: string; isDefault: number }[];
  order: number;
  date: string;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
}