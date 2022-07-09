import Component from '../../templates/component';
import { IProduct } from '../../ts/interfaces';

class Product extends Component {
  private cart: IProduct;

  constructor(tagName: string, className: string, cart: IProduct) {
    super(tagName, className);
    this.cart = cart;
  }

  generateButton(className: string, content: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = content;
    return button;
  }

  generateProduct(): void {
    // eslint-disable-next-line global-require
    const img: string = require(`@imgs/${this.cart.img}`);
    let template: string = '';

    if (this.cart.title) {
      template += `<div class="product__img">`;
      template += `<img src="${img}">`;
      template += `</div>`;
      template += `<div class="product__info">`;
      template += `<h3 class="product__title">${this.cart.title}</h3>`;
      template += `<p class="product__price">price: ${this.cart.price}$</p>`;
      template += `<p class="product__quantity">quantity: ${this.cart.quantity}</p>`;
      template += `<p class="product__writer">writer: ${this.cart.writer}</p>`;
      template += `<p class="product__publishDate">${this.cart.publishDate}</p>`;
      template += `</div>`;
    }
    const buttonAdd = this.generateButton('product__button', 'Add to cart');
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
