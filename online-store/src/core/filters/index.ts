import State from '@core/state';
import { TListenersElements } from '@core/ts/types';
import { ICallbacks, IProduct, IValueFilterEnable, IFiltersType } from '@core/ts/interfaces';
import { ParamsType } from '@core/ts/enum';
import { target } from 'noUiSlider';
import Sort from './sort';
import Filter from './filter';

type TGetRes = number | string | (string | number)[];

// ToDo разбить на модули
class Filters {
  filters: IFiltersType[];
  filter: Filter;
  sort: Sort;
  constructor() {
    this.filters = [];
    this.filter = new Filter();
    this.sort = new Sort();
  }

  public enableFiltersListener(
    args: IValueFilterEnable,
    callbacks: ICallbacks,
    wrapperCallback: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement,
    sort: TListenersElements | undefined,
    search: TListenersElements | undefined
  ): void {
    const myTarget = args.element as HTMLInputElement;
    const targetFilter = args.targetType;
    const mySort = sort as HTMLSelectElement;
    const mySearch = search as HTMLInputElement;

    const listeners = State.elements.get('listeners');

    const currentData = args.data;
    const deleteActiveClass = (arr: (HTMLLabelElement | HTMLInputElement)[][]): void => {
      const addEListener = (inputElement: HTMLInputElement, labelElement: Element): void => {
        labelElement.classList.remove('active');
      };
      const ids = [3, 4, 5, 6];
      ids.forEach((id: number) => {
        this.filters = this.filters.filter((el) => el.id !== id);
      });
      arr.forEach(([input, label]) => {
        addEListener(input as HTMLInputElement, label);
      });
    };

    const isChecked = (targetElement: HTMLInputElement, id: number, paramsType: string) => {
      if (targetElement.name === ParamsType.genres) {
        const valueUppercase = targetElement.value[0].toUpperCase() + targetElement.value.slice(1);
        if (targetElement.checked) {
          const filtersType = { id, params: paramsType, value: valueUppercase };
          localStorage.setItem(targetElement.value, JSON.stringify(filtersType));
          this.filters.push(filtersType);
        } else {
          localStorage.removeItem(targetElement.value);
          this.filters = this.filters.filter((el) => el.value !== valueUppercase);
        }
      } else if (targetElement.checked) {
        const filtersType = { id, params: paramsType, value: targetElement.value };
        localStorage.setItem(targetElement.value, JSON.stringify(filtersType));
        this.filters.push(filtersType);
      } else {
        localStorage.removeItem(targetElement.value);
        this.filters = this.filters.filter((el) => el.value !== targetElement.value);
      }
    };
    const isUpdated = (value: TGetRes | undefined, id: number, paramsType: string) => {
      this.filters = this.filters.filter((el) => el.params !== paramsType);
      const filter: IFiltersType = { id, params: paramsType, value: `${value}` };

      this.filters.push(filter);
    };

    switch (args.targetType) {
      case ParamsType.category:
      case ParamsType.status:
      case ParamsType.genres:
      case ParamsType.popular: {
        args.element.addEventListener('change', () => {
          if (targetFilter === ParamsType.category) {
            isChecked(myTarget, 3, ParamsType.category);
          }
          if (targetFilter === ParamsType.genres) {
            isChecked(myTarget, 4, ParamsType.genres);
          }
          if (targetFilter === ParamsType.status) {
            isChecked(myTarget, 5, ParamsType.status);
          }
          if (targetFilter === ParamsType.popular) {
            isChecked(myTarget, 6, ParamsType.popular);
          }
          this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, mySearch.value);
        });
        break;
      }
      case ParamsType.quantity:
      case ParamsType.year: {
        const range = args.element as target;
        range.noUiSlider?.on('update', () => {
          const value = range.noUiSlider?.get();
          if (targetFilter === ParamsType.quantity) {
            isUpdated(value, 1, ParamsType.quantity);
            localStorage.setItem('quantity', JSON.stringify(value));
          }
          if (targetFilter === ParamsType.year) {
            isUpdated(value, 2, ParamsType.year);
            localStorage.setItem('year', JSON.stringify(value));
          }
          this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, mySearch.value);
        });
        break;
      }
      case ParamsType.sort:
        args.element.addEventListener('change', () => {
          const element = args.element as HTMLSelectElement;
          localStorage.setItem('sort', element.value);
          this.filterOnPage(wrapperCallback, callbacks, currentData, element.value, mySearch.value);
        });
        break;
      case ParamsType.search:
        args.element.addEventListener('keyup', () => {
          const element = args.element as HTMLInputElement;

          const closeButton: HTMLElement = State.elements.get('searchClose') as HTMLElement;
          const currSearch = State.elements.get('search') as HTMLInputElement;
          const searchValue = localStorage.getItem('searchValue') || currSearch.value;
          if (searchValue !== '') {
            closeButton.classList.add('settings__search-close--active');
          } else {
            closeButton.classList.remove('settings__search-close--active');
          }
          closeButton.addEventListener('click', () => {
            currSearch.value = '';
            localStorage.removeItem('searchValue');
            closeButton.classList.remove('settings__search-close--active');
            this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, element.value);
          });
          this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, element.value);
        });
        break;
      case ParamsType.resetFilters:
      case ParamsType.resetSettings: {
        args.element.addEventListener('click', () => {
          if (args.targetType === ParamsType.resetFilters) {
            deleteActiveClass(listeners as (HTMLLabelElement | HTMLInputElement)[][]);
            const inputsAndButtonsElements = [
              // eslint-disable-next-line prettier/prettier
              'marvel',
              'dc',
              'other',
              'action',
              'superhero',
              'sci-fi',
              'ongoing',
              // eslint-disable-next-line prettier/prettier
              'completed',
              'rating',
              'marvel-btn',
              'dc-btn',
              'other-btn',
              'action-btn',
              // eslint-disable-next-line prettier/prettier
              'superhero-btn',
              'sci-fi-btn',
              'ongoing-btn',
              'completed-btn',
              'rating-btn',
            ];
            inputsAndButtonsElements.forEach((el) => {
              localStorage.removeItem(el);
            });
          }
          if (args.targetType === ParamsType.resetSettings) {
            localStorage.clear();
            window.location.reload();
          }
          this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, mySearch.value);
        });
        break;
      }
      default:
    }
  }

  protected filterOnPage(
    generateProduct: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement,
    callbacks: ICallbacks,
    data: IProduct[],
    targetSort: string,
    targetSearch: string
  ) {
    const inputsElements = ['marvel', 'dc', 'other', 'action', 'superhero', 'sci-fi', 'ongoing', 'completed', 'rating'];
    const filtersFromLocal: IFiltersType[] = [];
    inputsElements.forEach((el) => {
      if (el in localStorage) {
        const input = JSON.parse(localStorage.getItem(el) ?? '');
        filtersFromLocal.push(input);
      }
    });
    this.filters = filtersFromLocal.length === 0 ? this.filters : filtersFromLocal;
    const searchValue = localStorage.getItem('searchValue') || targetSearch;
    const search = State.elements.get('search') as HTMLInputElement;
    search.value = searchValue;
    search.focus();

    // const closeButton: HTMLElement = State.elements.get('searchClose') as HTMLElement;
    // if (searchValue !== '') {
    //   closeButton.classList.add('settings__search-close--active');
    // } else {
    //   closeButton.classList.remove('settings__search-close--active');
    // }
    // closeButton.addEventListener('click', () => {
    //   search.value = '';
    //   search.required = true;
    //   localStorage.removeItem('searchValue');
    // });

    const filteredData = this.filter.filterData(data, this.filters);
    const sortedBy = localStorage.getItem('sort') ?? targetSort;
    const sortedData = this.sort.sortData(filteredData, sortedBy);
    const filteredByAll = this.filter.filterBySearch(searchValue, sortedData);

    generateProduct(callbacks, filteredByAll);
    if (searchValue !== '' && filteredByAll.length === 0) {
      const products = State.elements.get('productsWrapper') as HTMLElement;
      const h2 = document.createElement('h2');
      h2.classList.add('products__title');
      h2.innerText = 'Ничего не найдено';
      products.append(h2);
    }
  }
}

export default Filters;
