/* eslint-disable import/extensions */
import Page from '@core/templates/page';
import State from '@core/state';
import Component from '@core/templates/component';
import { IProduct, ICallbacks } from '@core/ts/interfaces';
import { Settings } from '@/core/components';
import Filters from '@/core/filters';
import { filterInputValue, addListenersOnButton, filterButtonValue, filterSelectValue } from './homeHelpers';

class MainPage extends Page {
  protected data: IProduct[];
  products: HTMLElement;

  constructor(id: string, data: IProduct[]) {
    super(id);
    this.data = data;
    this.products = this.generateProducts();
  }

  private generateSettings(): HTMLElement {
    const settings = new Component('section', 'settings');
    const title = document.createElement('h2');
    title.classList.add('settings__title');
    title.textContent = 'Настройки';
    settings.appendContent(title);
    return settings.render();
  }

  protected generateProducts(): HTMLElement {
    const products = new Component('section', 'products');
    const title = document.createElement('h2');
    title.classList.add('products__title');
    title.textContent = 'Товары';
    products.appendContent(title);
    return products.render();
  }

  protected generateProductWrapper(callbacks: ICallbacks, data: IProduct[] = this.data): HTMLElement {
    const products = callbacks.wrapper;
    products.innerHTML = '';
    products.append(callbacks.product(data));
    callbacks.container.append(products);
    return callbacks.container;
  }

  protected generateProduct(data: IProduct[]): HTMLElement {
    const productsWrapper = document.createElement('div');
    productsWrapper.classList.add('products__wrapper');

    State.elements.set('productsWrapper', productsWrapper);

    addListenersOnButton(data, productsWrapper);
    return productsWrapper;
  }

  private generateSettingsFilters(): void {
    const settings = this.generateSettings();
    const settingsWrap = new Settings('div', 'settings__wrapper');
    settings.append(settingsWrap.render());
    this.container.append(settings);
  }

  private enableAllListeners(): void {
    const filters = new Filters();
    const search = State.elements.get('search');
    const sort = State.elements.get('sort');

    if (!(search instanceof HTMLInputElement) || !(sort instanceof HTMLSelectElement)) {
      throw new Error('Search or Sort has wrong type of element');
    } else {
      filterInputValue.forEach((item) => {
        if (State.elements.has(item.input)) {
          const inputElement = State.elements.get(item.input);
          if (!(inputElement instanceof HTMLInputElement)) {
            throw new Error('InputElement has wrong type of element');
          }
          filters.enableFiltersListener(
            {
              element: inputElement,
              data: this.data,
              targetType: item.type,
              value: item.value,
            },
            { wrapper: this.products, container: this.container, product: this.generateProduct },
            this.generateProductWrapper,
            sort,
            search
          );
        }
      });
      filterButtonValue.forEach((item) => {
        if (State.elements.has(item.input)) {
          const buttonElement = State.elements.get(item.input);
          if (!(buttonElement instanceof HTMLButtonElement)) {
            throw new Error('buttonElement has wrong type of element');
          }
          filters.enableFiltersListener(
            {
              element: buttonElement,
              data: this.data,
              targetType: item.type,
              value: item.value,
            },
            { wrapper: this.products, container: this.container, product: this.generateProduct },
            this.generateProductWrapper,
            sort,
            search
          );
        }
      });
      filterSelectValue.forEach((item) => {
        if (State.elements.has(item.input)) {
          const selectElement = State.elements.get(item.input);
          if (!(selectElement instanceof HTMLSelectElement)) {
            throw new Error('selectElement has wrong type of element');
          }
          filters.enableFiltersListener(
            {
              element: selectElement,
              data: this.data,
              targetType: item.type,
              value: item.value,
            },
            { wrapper: this.products, container: this.container, product: this.generateProduct },
            this.generateProductWrapper,
            sort,
            search
          );
        }
      });
    }
  }

  protected checkButtons(elements: HTMLInputElement[][]) {
    elements.forEach((item) => {
      const [input, label] = item;
      const myTarget = input as HTMLInputElement;
      const isChecked = localStorage.getItem(`${myTarget.value}-btn`);
      if (isChecked) {
        myTarget.checked = true;
        label.classList.add('active');
      } else {
        myTarget.checked = false;
        label.classList.remove('active');
      }
    });
  }

  render(): HTMLElement {
    this.generateSettingsFilters();
    const listeners = State.elements.get('listeners') as HTMLInputElement[][];
    this.checkButtons(listeners);

    this.generateProductWrapper({ wrapper: this.products, container: this.container, product: this.generateProduct });
    this.enableAllListeners();
    return this.container;
  }
}

export default MainPage;
