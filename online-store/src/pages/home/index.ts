/* eslint-disable import/extensions */
import Page from '@core/templates/page';
import Component from '@core/templates/component';
import { IProduct } from '@core/ts/interfaces';
import { Settings, Product } from '@/core/components';

class MainPage extends Page {
  protected data: IProduct[];
  constructor(id: string, data: IProduct[]) {
    super(id);
    this.data = data;
  }

  generateSettings(): HTMLElement {
    const settings = new Component('section', 'settings');
    const title = document.createElement('h2');
    title.classList.add('settings__title');
    title.textContent = 'Настройки';
    settings.appendContent(title);
    return settings.render();
  }

  generateProducts(): HTMLElement {
    const products = new Component('section', 'products');
    const title = document.createElement('h2');
    title.classList.add('products__title');
    title.textContent = 'Товары';
    products.appendContent(title);
    return products.render();
  }

  generateProductCart(): HTMLElement {
    const products = this.generateProducts();
    const productsWrapper = document.createElement('div');
    productsWrapper.classList.add('products__wrapper');
    this.data.forEach((product) => {
      const productCart = new Product('div', 'product', product);
      productsWrapper.append(productCart.render());
    });
    products.append(productsWrapper);
    this.container.append(products);
    return this.container;
  }

  generateSettingsFilters(): void {
    const settings = this.generateSettings();
    const settingsWrap = new Settings('div', 'settings__wrapper');
    settings.append(settingsWrap.render());
    this.container.append(settings);
  }

  render(): HTMLElement {
    this.generateSettingsFilters();
    this.generateProductCart();
    return this.container;
  }
}

export default MainPage;
