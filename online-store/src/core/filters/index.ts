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

  enableFiltersListener(
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

    if (
      args.targetType === ParamsType.category ||
      args.targetType === ParamsType.status ||
      args.targetType === ParamsType.genres ||
      args.targetType === ParamsType.popular
    ) {
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
    }

    if (args.targetType === ParamsType.quantity || args.targetType === ParamsType.year) {
      const range = args.element as target;
      range.noUiSlider?.on('update', () => {
        const value = range.noUiSlider?.get();
        if (targetFilter === ParamsType.quantity) {
          isUpdated(value, 1, ParamsType.quantity);
        }
        if (targetFilter === ParamsType.year) {
          isUpdated(value, 2, ParamsType.year);
        }
        this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, mySearch.value);
      });
    }
    if (args.targetType === ParamsType.sort) {
      args.element.addEventListener('change', () => {
        const element = args.element as HTMLSelectElement;
        this.filterOnPage(wrapperCallback, callbacks, currentData, element.value, mySearch.value);
      });
    }
    if (args.targetType === ParamsType.search) {
      args.element.addEventListener('keyup', () => {
        const element = args.element as HTMLInputElement;
        this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, element.value);
      });
    }
    if (args.targetType === ParamsType.resetFilters || args.targetType === ParamsType.resetSettings) {
      args.element.addEventListener('click', () => {
        if (args.targetType === 'resetFilters') {
          deleteActiveClass(listeners as (HTMLLabelElement | HTMLInputElement)[][]);
          const inputsElements = [
            'marvel',
            'dc',
            'other',
            'action',
            'superhero',
            'sci-fi',
            'ongoing',
            'completed',
            'rating',
            'marvel-btn',
            'dc-btn',
            'other-btn',
            'action-btn',
            'superhero-btn',
            'sci-fi-btn',
            'ongoing-btn',
            'completed-btn',
            'rating-btn',
          ];
          inputsElements.forEach((el) => {
            localStorage.removeItem(el);
          });
          this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, mySearch.value);
        }
      });
    }
  }

  filterOnPage(
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

    const filteredData = this.filter.filterData(data, this.filters);
    const sortedData = this.sort.sortData(filteredData, targetSort);
    const filteredByAll = this.filter.filterBySearch(targetSearch, sortedData);

    generateProduct(callbacks, filteredByAll);
    if (targetSearch !== '' && filteredByAll.length === 0) {
      const products = State.elements.get('productsWrapper') as HTMLElement;
      const h2 = document.createElement('h2');
      h2.classList.add('products__title');
      h2.innerText = 'Ничего не найдено';
      products.append(h2);
    }
  }
}

export default Filters;
