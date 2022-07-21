import { TListenersElements } from '@core/ts/types';

interface IProduct {
  id: number;
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
  status: string;
}
interface IValueFilterEnable {
  element: HTMLElement;
  data: IProduct[];
  targetType: string;
  value: string;
}
interface ICallbacks {
  wrapper: HTMLElement;
  container: HTMLElement;
  product: (data: IProduct[]) => HTMLElement;
}

interface IFiltersType {
  id: number;
  params: string;
  value: string;
}

interface IFilterValues {
  type: keyof IProduct;
  input: TListenersElements | undefined;
  value: string;
}

interface IResult {
  data: IProduct[];
  resQuantity: IProduct[];
  resYears: IProduct[];
  resCategory: IProduct[];
  resGenres: IProduct[];
  resStatus: IProduct[];
  resPopular: IProduct[];
}

export { IProduct, IValueFilterEnable, ICallbacks, IFiltersType, IFilterValues, IResult };
