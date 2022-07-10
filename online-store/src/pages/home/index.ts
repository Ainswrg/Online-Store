/* eslint-disable import/extensions */
import Page from '@core/templates/page';
import Component from '@core/templates/component';
import Product from '@core/components/product';
import { IProduct } from '@core/ts/interfaces';

class MainPage extends Page {
  protected data: IProduct[];
  static TextObject = {
    MainTitle: 'GeekComics',
  };
  constructor(id: string, data: IProduct[]) {
    super(id);
    this.data = data;
  }

  generateProducts() {
    const products = new Component('div', 'products');
    return products.render();
  }

  generateProductCart() {
    const products = this.generateProducts();
    this.data.forEach((product) => {
      const productCart = new Product('div', 'product', product);
      products.append(productCart.render());
    });
    this.container.append(products);
    return this.container;
  }

  render() {
    this.generateProductCart();
    return this.container;
  }
}

export default MainPage;
