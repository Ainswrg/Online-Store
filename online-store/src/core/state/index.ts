import { IFiltersType } from '@core/ts/interfaces';
import { TListenersElements } from '@core/ts/types';

class State {
  static cart: HTMLElement[] = [];
  static elements: Map<string, TListenersElements | HTMLInputElement[][]> = new Map();
  static filters: IFiltersType[];

  static addToCart(product: HTMLElement) {
    State.cart.push(product);
  }
  static removeFromCart(product: HTMLElement) {
    State.cart = State.cart.filter((p) => p.id !== product.id);
  }
  static getCart(): HTMLElement[] {
    return State.cart;
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
