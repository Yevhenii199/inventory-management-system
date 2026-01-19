//app.data.ts
export interface Price {
  value: number;
  symbol: string;
  isDefault: number;
}

export interface Order {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface Product {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: { start: string; end: string };
  price: Price[];
  order: number;
  date: string;
  responsiblePerson?: string;
}

const baseProduct = {
  photo: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop',
  title: 'Gigabyte Technology X58-USB3 (Socket 1366)',
  type: 'Мониторы',
  specification: 'Монитор Standard',
  guarantee: { start: '2017-04-06 12:00:00', end: '2025-08-06 12:00:00' },
  price: [
    { value: 2500, symbol: 'USD', isDefault: 0 },
    { value: 250000.50, symbol: 'UAH', isDefault: 1 }
  ],
  date: '2017-06-29 12:09:33'
};

export const orders: Order[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 
    ? `Длинное предлинное длиннючее название группы №${i + 1}` 
    : `Длинное название прихода №${i + 1}`,
  date: i % 3 === 0 ? '2017-10-06 12:09:33' : '2017-09-06 12:00:00',
  description: 'desc'
}));

const generateProducts = (): Product[] => {
  const allProducts: Product[] = [];
  let globalId = 1;
  orders.forEach((order) => {
    for (let j = 1; j <= 23; j++) {
      allProducts.push({
        ...baseProduct,
        id: globalId,
        serialNumber: 100000000 + globalId,
        isNew: j % 3 === 0 ? 0 : 1,
        order: order.id,
        specification: `Монитор ${j}`,
        responsiblePerson: j === 3 ? 'Христорождественский Александр' : undefined
      });
      globalId++;
    }
  });
  return allProducts;
};

export const products: Product[] = generateProducts();