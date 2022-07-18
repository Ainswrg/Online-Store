import { Product } from '@core/components';
import { IFiltersType } from '@core/ts/interfaces';
import { TListenersElements } from '@core/ts/types';

class State {
  static cart: Map<string, Product | HTMLElement> = new Map();
  static elements: Map<string, TListenersElements | HTMLInputElement[][]> = new Map();
  static filters: IFiltersType[];

  static addToCart(name: string, element: Product | HTMLElement): void {
    State.cart.set(name, element);
  }

  static addToElements(name: string, element: TListenersElements | HTMLInputElement[][]): void {
    State.elements.set(name, element);
  }
  static getElements(): Map<string, TListenersElements | HTMLInputElement[][]> {
    return State.elements;
  }
  static addToFilters(filter: IFiltersType): void {
    State.filters.push(filter);
  }
  static getFilters(): IFiltersType[] {
    return State.filters;
  }
  static removeFromFilters(filter: string): void {
    State.filters = State.filters.filter((f) => f.params !== filter);
  }
}

export default State;
