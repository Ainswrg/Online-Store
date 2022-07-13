interface IProduct {
  title: string;
  genres: string[];
  quantity: number;
  category: string[];
  price: number;
  year: string;
  writer: string;
  img: string;
  description: string;
  rating: number;
}
interface Test {
  test: string;
}

export { IProduct, Test };
