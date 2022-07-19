import State from '@core/state';
import { IProduct } from '@core/ts/interfaces';
import Component from '@core/templates/component';

class Product extends Component {
  private product: IProduct;

  constructor(tagName: string, className: string, product: IProduct) {
    super(tagName, className);
    this.product = product;
  }

  generateButton(className: string, content: string, counter?: number): HTMLButtonElement {
    const button = document.createElement('button');
    const buttonContainer = document.createElement('div');
    button.classList.add(className);

    const span = document.createElement('span');
    span.textContent = content;
    buttonContainer.append(span);
    if (Number(counter) >= 0) {
      const counterSpan = document.createElement('i');
      counterSpan.classList.add('product__counter');
      counterSpan.textContent = `(${counter})`;
      buttonContainer.append(counterSpan);
      State.addToElements('counter', counterSpan);
    }
    button.append(buttonContainer);
    return button;
  }

  generateProduct(): void {
    // eslint-disable-next-line global-require
    const img: string = require(`@imgs/${this.product.img}.webp`);

    if (this.product.title) {
      const productImgBlock = document.createElement('div');
      productImgBlock.classList.add('product__img');

      const productImg = document.createElement('img');
      productImg.src = `${img}`;
      productImg.alt = `img`;

      const productInfo = document.createElement('div');
      productInfo.classList.add('product__info');

      const productTitle = document.createElement('h3');
      productTitle.classList.add('product__title');
      productTitle.textContent = this.product.title;

      const productPrice = document.createElement('p');
      productPrice.classList.add('product__price');
      productPrice.textContent = `$${this.product.price}.`;

      const productQuantity = document.createElement('p');
      productQuantity.classList.add('product__quantity');
      productQuantity.textContent = `${this.product.quantity} шт.`;

      const productWriter = document.createElement('p');
      productWriter.classList.add('product__writer');
      productWriter.textContent = `Автор: ${this.product.writer}`;

      const productGenres = document.createElement('ul');
      productGenres.classList.add('product__genres');
      productGenres.innerHTML = `Жанр: ${this.product.genres.map((genre) => `<li>${genre}</li>`).join('')}`;

      const productYear = document.createElement('p');
      productYear.classList.add('product__publish-date');
      productYear.textContent = `Год издания: ${this.product.year}`;

      const productCategory = document.createElement('p');
      productCategory.classList.add('product__category');
      productCategory.textContent = `Категория: ${this.product.category.join(', ')}`;

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
    const counter = localStorage.getItem(`counter${this.product.id}`) || 0;
    const buttonAdd = this.generateButton('product__button', 'Добавить', Number(counter));
    const buttonDel = this.generateButton('product__button', 'Удалить');

    State.addToElements('buttonAdd', buttonAdd);
    State.addToElements('buttonDel', buttonDel);
    this.container.append(buttonAdd, buttonDel);
  }

  render() {
    this.generateProduct();
    return this.container;
  }
}

export default Product;
