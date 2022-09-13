import { Product } from '@core/components';
import { IFiltersType } from '@core/ts/interfaces';
import { TListenersElements } from '@core/ts/types';

class State {
  static cart: Map<string, Product | HTMLElement> = new Map();
  static elements: Map<string, string | TListenersElements | TListenersElements[][]> = new Map();
  static filters: IFiltersType[] = [];

  static addToCart(name: string, element: Product | HTMLElement): void {
    State.cart.set(name, element);
  }
  static removeFromCart(name: string): void {
    State.cart.delete(name);
  }
  static getCart(): Map<string, Product | HTMLElement> {
    return State.cart;
  }
  static addToElements(name: string, element: TListenersElements | TListenersElements[][]): void {
    State.elements.set(name, element);
  }
  static getElements(): Map<string, string | TListenersElements | TListenersElements[][]> {
    return State.elements;
  }
  static addToFilters(filter: IFiltersType): void {
    this.filters.push(filter);
  }
  static getFilters(): IFiltersType[] {
    return this.filters;
  }
  static removeFromFilters(filter: string, type = 'value'): void {
    this.filters = this.filters.filter((f) => (type === 'value' ? f.value !== filter : f.params !== filter));
  }
  static syncFiltersWithLocalStorage(filtersFromLocal: IFiltersType[]): void {
    if (filtersFromLocal.length !== 0) {
      this.filters = filtersFromLocal;
    }
  }
}

export default State;
