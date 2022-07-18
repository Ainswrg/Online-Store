/* eslint-disable import/extensions */
import Page from '@core/templates/page';
import State from '@core/state';
import Component from '@core/templates/component';
import { IProduct, ICallbacks } from '@core/ts/interfaces';
import { Settings, Product } from '@/core/components';
import Filters from '@/core/filters';

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
    const generateModal = (content: string) => {
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
        }, 800);
      });
    };
    const span = State.elements.get('span') as HTMLElement;

    data.forEach((product) => {
      const productCart = new Product('div', 'product', product);
      const renderCart = productCart.render();
      productsWrapper.append(renderCart);
      const buttonAdd = State.elements.get('buttonAdd') as HTMLButtonElement;
      const buttonDel = State.elements.get('buttonDel') as HTMLButtonElement;
      const counterSpan = State.elements.get('counter') as HTMLElement;
      buttonAdd?.addEventListener('click', () => {
        const { length } = State.getCart();
        if (length < 20) {
          State.addToCart(renderCart);
          counterSpan!.innerHTML = '';
          counterSpan!.textContent = `(1)`;
          span.innerHTML = '';
          span.textContent = `${length + 1}`;
        } else {
          generateModal('Вы не можете добавить больше 20 товаров');
        }
      });
      buttonDel?.addEventListener('click', () => {
        counterSpan!.innerHTML = '';
        counterSpan!.textContent = `(0)`;
        State.removeFromCart(renderCart);
        span.innerHTML = '';
        span.textContent = `${State.getCart().length}`;
      });
    });
    return productsWrapper;
  }

  private generateSettingsFilters(): void {
    const settings = this.generateSettings();
    const settingsWrap = new Settings('div', 'settings__wrapper');
    settings.append(settingsWrap.render());
    this.container.append(settings);
  }
  // ToDo: уменьшить код

  private enableAllListeners(): void {
    const filters = new Filters();
    const search = State.elements.get('search') as HTMLInputElement;
    const sort = State.elements.get('sort') as HTMLSelectElement;
    const inputMarvel = State.elements.get('inputMarvel');
    const inputDC = State.elements.get('inputDC');
    const inputOther = State.elements.get('inputOther');
    const inputSuperhero = State.elements.get('inputSuperhero');
    const inputAction = State.elements.get('inputAction');
    const inputScience = State.elements.get('inputScience');
    const inputOngoing = State.elements.get('inputOngoing');
    const inputCompleted = State.elements.get('inputCompleted');
    const inputPopular = State.elements.get('inputPopular');
    const quantity = State.elements.get('quantityRange');
    const year = State.elements.get('yearsRange');
    const buttonResetFilters = State.elements.get('buttonResetFilters');
    const buttonResetSettings = State.elements.get('buttonResetSettings');

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
      {
        type: 'resetFilters',
        input: buttonResetFilters,
        value: '',
      },
      {
        type: 'resetSettings',
        input: buttonResetSettings,
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

  checkButtons(elements: HTMLInputElement[][]) {
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
