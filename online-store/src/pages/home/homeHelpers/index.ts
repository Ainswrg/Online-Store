import Component from '@core/templates/component';
import State from '@core/state';
import { IProduct } from '@core/ts/interfaces';
import { Product } from '@core/components';

const filterInputValue = [
  {
    type: 'search',
    input: 'search',
    value: '',
  },
  {
    type: 'category',
    input: 'inputMarvel',
    value: 'marvel',
  },
  {
    type: 'category',
    input: 'inputDC',
    value: 'dc',
  },
  {
    type: 'category',
    input: 'inputOther',
    value: 'other',
  },
  {
    type: 'genres',
    input: 'inputSuperhero',
    value: 'superhero',
  },
  {
    type: 'genres',
    input: 'inputAction',
    value: 'action',
  },
  {
    type: 'genres',
    input: 'inputScience',
    value: 'sci-fi',
  },
  {
    type: 'status',
    input: 'inputOngoing',
    value: 'ongoing',
  },
  {
    type: 'status',
    input: 'inputCompleted',
    value: 'completed',
  },
  {
    type: 'rating',
    input: 'inputPopular',
    value: 'rating',
  },
  {
    type: 'quantity',
    input: 'quantity',
    value: '',
  },
  {
    type: 'year',
    input: 'year',
    value: '',
  },
];
const filterButtonValue = [
  {
    type: 'resetFilters',
    input: 'buttonResetFilters',
    value: '',
  },
  {
    type: 'resetSettings',
    input: 'buttonResetSettings',
    value: '',
  },
];
const filterSelectValue = [
  {
    type: 'sort',
    input: 'sort',
    value: '',
  },
];

const generateModal = (content: string, timeout: number) => {
  const { body } = document;
  const modal = new Component('div', 'modal');
  const modalContent = new Component('div', 'modal__content');
  const modalText = new Component('p', 'modal__text');
  modalText.appendText(content);
  modalContent.appendContent(modalText.render());
  modal.appendContent(modalContent.render());
  const render = modal.render();
  body.append(render);
  setTimeout(() => {
    render.classList.add('modal--active');
  }, 100);
  setTimeout(() => {
    render.classList.remove('modal--active');
    setTimeout(() => {
      render.remove();
    }, timeout);
  });
};
const addListenersOnButton = (arrData: IProduct[], wrapper: HTMLDivElement) => {
  const span = State.elements.get('span');
  arrData.forEach((product) => {
    const productCart = new Product('div', 'product', product);
    const renderCart = productCart.render();
    wrapper.append(renderCart);
    const buttonAdd = State.elements.get('buttonAdd');
    const buttonDel = State.elements.get('buttonDel');
    const counterSpan = State.elements.get('counter');
    if (!(buttonAdd instanceof HTMLButtonElement) || !(buttonDel instanceof HTMLButtonElement)) {
      throw new Error('Buttons are not instance of HTMLButtonElement');
    }
    if (!(counterSpan instanceof HTMLSpanElement)) {
      throw new Error('Counter is not instance of HTMLSpanElement');
    }
    if (!(span instanceof HTMLSpanElement)) {
      throw new Error('Span is not instance of HTMLDivElement');
    }
    if (`productCart${product.id}` in localStorage) {
      if (!State.cart.has(`productCart${product.id}`)) {
        State.addToCart(`productCart${product.id}`, productCart);
      }
    }
    buttonAdd.addEventListener('click', () => {
      const cartCounter: number | boolean =
        'cartLength' in localStorage ? Number(localStorage.getItem('cartLength')) : State.cart.size;

      if (cartCounter < 20) {
        State.addToCart(`productCart${product.id}`, productCart);
        localStorage.setItem(`productCart${product.id}`, JSON.stringify(productCart));
        counterSpan.innerHTML = '';
        counterSpan.textContent = `(1)`;
        span.innerHTML = '';
        span.textContent = `${State.cart.size}`;

        localStorage.setItem(`counter${product.id}`, `1`);
        localStorage.setItem(`cartLength`, JSON.stringify(State.cart.size));
      } else {
        generateModal('Вы не можете добавить больше 20 товаров', 700);
      }
    });
    buttonDel.addEventListener('click', () => {
      State.cart.delete(`productCart${product.id}`);
      localStorage.removeItem(`productCart${product.id}`);
      counterSpan.innerHTML = '';
      counterSpan.textContent = `(0)`;
      span.innerHTML = '';
      span.textContent = `${State.cart.size}`;
      localStorage.removeItem(`counter${product.id}`);
      localStorage.setItem(`cartLength`, JSON.stringify(State.cart.size));
    });
  });
};

export { filterInputValue, filterButtonValue, filterSelectValue, generateModal, addListenersOnButton };
