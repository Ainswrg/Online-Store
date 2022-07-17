/* eslint-disable import/extensions */
import Page from '@core/templates/page';
import Component from '@core/templates/component';
import { IProduct, ICallbacks } from '@core/ts/interfaces';
import { TListenersElements } from '@core/ts/types';
import { Settings, Product } from '@/core/components';
import Filters from '@/core/filters';

class MainPage extends Page {
  protected data: IProduct[];
  values = new Map<string, TListenersElements>();
  products: HTMLElement;
  buttons: HTMLElement[] = [];

  constructor(id: string, data: IProduct[]) {
    super(id);
    this.data = data;
    this.buttons = [];
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
    data.forEach((product) => {
      const productCart = new Product('div', 'product', product);
      productsWrapper.append(productCart.render());
    });
    return productsWrapper;
  }

  private generateSettingsFilters(): void {
    const settings = this.generateSettings();
    const settingsWrap = new Settings('div', 'settings__wrapper');
    settings.append(settingsWrap.render());
    this.setValues(settingsWrap.getValues());
    this.container.append(settings);
  }

  enableAllListeners(): void {
    const filters = new Filters();
    const values = this.getValues();

    const search = values.get('search');
    const sort = values.get('sort');
    const inputMarvel = values.get('inputMarvel');
    const inputDC = values.get('inputDC');
    const inputOther = values.get('inputOther');
    const inputSuperhero = values.get('inputSuperhero');
    const inputAction = values.get('inputAction');
    const inputScience = values.get('inputScience');
    const inputOngoing = values.get('inputOngoing');
    const inputCompleted = values.get('inputCompleted');
    const inputPopular = values.get('inputPopular');
    const quantity = values.get('quantityRange');
    const year = values.get('yearsRange');

    const filterValue = [
      {
        type: 'sort',
        input: sort,
        value: '',
      },
      {
        type: 'search',
        input: search,
        value: '',
      },
      {
        type: 'category',
        input: inputMarvel,
        value: 'marvel',
      },
      {
        type: 'category',
        input: inputDC,
        value: 'dc',
      },
      {
        type: 'category',
        input: inputOther,
        value: 'other',
      },
      {
        type: 'genres',
        input: inputSuperhero,
        value: 'superhero',
      },
      {
        type: 'genres',
        input: inputAction,
        value: 'action',
      },
      {
        type: 'genres',
        input: inputScience,
        value: 'sci-fi',
      },
      {
        type: 'status',
        input: inputOngoing,
        value: 'ongoing',
      },
      {
        type: 'status',
        input: inputCompleted,
        value: 'completed',
      },
      {
        type: 'rating',
        input: inputPopular,
        value: 'rating',
      },
      {
        type: 'quantity',
        input: quantity,
        value: '',
      },
      {
        type: 'year',
        input: year,
        value: '',
      },
    ];

    filterValue.forEach((item) => {
      filters.enableFiltersListener(
        {
          element: item.input as HTMLInputElement,
          data: this.data,
          targetType: item.type,
          value: item.value,
        },
        { wrapper: this.products, container: this.container, product: this.generateProduct },
        this.generateProductWrapper,
        sort,
        search
      );
    });
  }

  setButtons(el: HTMLElement) {
    this.buttons.push(el);
  }

  getValues(): Map<string, TListenersElements> {
    return this.values;
  }

  setValues(values: Map<string, TListenersElements>): void {
    this.values = values;
  }

  render(): HTMLElement {
    this.generateSettingsFilters();
    this.generateProductWrapper({ wrapper: this.products, container: this.container, product: this.generateProduct });
    this.enableAllListeners();
    return this.container;
  }
}

export default MainPage;
