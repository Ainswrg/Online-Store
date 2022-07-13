import Component from '@core/templates/component';
import { IProduct } from '@core/ts/interfaces';

class Product extends Component {
  private cart: IProduct;

  constructor(tagName: string, className: string, cart: IProduct) {
    super(tagName, className);
    this.cart = cart;
  }

  generateButton(className: string, content: string, counter?: number): HTMLDivElement {
    const btnWrapper = document.createElement('div');
    const button = document.createElement('button');
    btnWrapper.classList.add(className);

    const span = document.createElement('span');
    span.textContent = content;
    button.append(span);
    if (Number(counter) >= 0) {
      const counterSpan = document.createElement('i');
      counterSpan.classList.add('product__counter');
      counterSpan.textContent = `(${counter})`;
      button.append(counterSpan);
    }
    btnWrapper.append(button);
    return btnWrapper;
  }

  generateProduct(): void {
    // eslint-disable-next-line global-require
    const img: string = require(`@imgs/${this.cart.img}.webp`);
    let template: string = '';
    // ToDo переписать без template
    if (this.cart.title) {
      template += `<div class="product__img">`;
      template += `<img src="${img}" alt=${this.cart.img}>`;
      template += `</div>`;
      template += `<div class="product__info">`;
      template += `<h3 class="product__title">${this.cart.title}</h3>`;
      template += `<p class="product__price">$${this.cart.price}</p>`;
      template += `<p class="product__quantity">quantity: ${this.cart.quantity}</p>`;
      template += `<p class="product__writer">${this.cart.writer}</p>`;
      template += `<ul class="product__genres">genres: ${this.cart.genres
        .map((genre) => `<li>${genre}</li>`)
        .join('')}</ul>`;
      template += `<p class="product__category">[${this.cart.category.join(', ')}]</p>`;
      template += `<p class="product__publishDate">${this.cart.publishDate}</p>`;
      template += `</div>`;
    }
    const buttonAdd = this.generateButton('product__button', 'Add to cart', 0);
    const buttonDel = this.generateButton('product__button', 'Delete from cart');

    this.container.innerHTML = template;
    this.container.append(buttonAdd);
    this.container.append(buttonDel);
  }

  render() {
    this.generateProduct();
    return this.container;
  }
}

export default Product;
