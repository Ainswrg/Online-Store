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

    if (this.cart.title) {
      const productImgBlock = document.createElement('div');
      productImgBlock.classList.add('product__img');

      const productImg = document.createElement('img');
      productImg.src = `${img}`;
      productImg.alt = `img`;

      const productInfo = document.createElement('div');
      productInfo.classList.add('product__info');

      const productTitle = document.createElement('h3');
      productTitle.classList.add('product__title');
      productTitle.textContent = this.cart.title;

      const productPrice = document.createElement('p');
      productPrice.classList.add('product__price');
      productPrice.textContent = `$${this.cart.price}.`;

      const productQuantity = document.createElement('p');
      productQuantity.classList.add('product__quantity');
      productQuantity.textContent = `${this.cart.quantity} шт.`;

      const productWriter = document.createElement('p');
      productWriter.classList.add('product__writer');
      productWriter.textContent = `Автор: ${this.cart.writer}`;

      const productGenres = document.createElement('ul');
      productGenres.classList.add('product__genres');
      productGenres.innerHTML = `Жанр: ${this.cart.genres.map((genre) => `<li>${genre}</li>`).join('')}`;

      const productYear = document.createElement('p');
      productYear.classList.add('product__publish-date');
      productYear.textContent = `Год издания: ${this.cart.year}`;

      const productCategory = document.createElement('p');
      productCategory.classList.add('product__category');
      productCategory.textContent = `Категория: ${this.cart.category.join(', ')}`;

      productImgBlock.append(productImg);
      productInfo.append(
        productTitle,
        productPrice,
        productQuantity,
        productWriter,
        productGenres,
        productYear,
        productCategory
      );
      this.container.append(productImgBlock, productInfo);
    }
    const buttonAdd = this.generateButton('product__button', 'Add to cart', 0);
    const buttonDel = this.generateButton('product__button', 'Delete from cart');
    this.container.append(buttonAdd, buttonDel);
  }

  render() {
    this.generateProduct();
    return this.container;
  }
}

export default Product;
