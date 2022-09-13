import State from '@core/state';
import { TListenersElements } from '@core/ts/types';
import { ICallbacks, IProduct, IValueFilterEnable, IFiltersType } from '@core/ts/interfaces';
import { ParamsType } from '@core/ts/enum';
import { target } from 'noUiSlider';
import Sort from './sort';
import Filter from './filter';

type TGetRes = number | string | (string | number)[];

class Filters {
  filter: Filter;
  sort: Sort;
  constructor() {
    this.filter = new Filter();
    this.sort = new Sort();
  }

  public enableFiltersListener(
    args: IValueFilterEnable,
    callbacks: ICallbacks,
    wrapperCallback: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement,
    sort: TListenersElements,
    search: TListenersElements
  ): void {
    if (!(sort instanceof HTMLSelectElement)) {
      throw new Error('sort is not HTMLInputElement');
    }
    if (!(search instanceof HTMLInputElement)) {
      throw new Error('search is not HTMLInputElement');
    }
    const myTarget = args.element;
    const targetFilter = args.targetType;
    const listeners = State.elements.get('listeners');
    const currentData = args.data;

    const deleteActiveClass = (arr: (HTMLLabelElement | HTMLInputElement)[][]): void => {
      const addEListener = (inputElement: HTMLInputElement, labelElement: Element): void => {
        labelElement.classList.remove('active');
      };
      const ids = [1, 2, 3, 4, 5, 6];
      ids.forEach((id: number) => {
        State.filters = State.filters.filter((el) => el.id !== id);
      });
      arr.forEach(([input, label]) => {
        addEListener(input as HTMLInputElement, label);
      });
    };

    const isCheckedInputs = (targetElement: HTMLInputElement, id: number, paramsType: string) => {
      if (targetElement.name === ParamsType.genres) {
        const valueUppercase = targetElement.value[0].toUpperCase() + targetElement.value.slice(1);
        if (targetElement.checked) {
          const filtersType = { id, params: paramsType, value: valueUppercase };
          localStorage.setItem(targetElement.value, JSON.stringify(filtersType));
          State.addToFilters(filtersType);
        } else {
          localStorage.removeItem(targetElement.value);
          State.removeFromFilters(valueUppercase);
        }
      } else if (targetElement.checked) {
        const filtersType = { id, params: paramsType, value: targetElement.value };
        localStorage.setItem(targetElement.value, JSON.stringify(filtersType));
        State.addToFilters(filtersType);
      } else {
        localStorage.removeItem(targetElement.value);
        State.removeFromFilters(targetElement.value);
      }
    };
    const isUpdated = (value: TGetRes | undefined, id: number, paramsType: string) => {
      const filterType: IFiltersType = { id, params: paramsType, value: `${value}` };
      State.removeFromFilters(paramsType, 'params');
      localStorage.setItem(`${paramsType}Filter`, JSON.stringify(filterType));
      State.addToFilters(filterType);
    };
    switch (args.targetType) {
      case ParamsType.category:
      case ParamsType.status:
      case ParamsType.genres:
      case ParamsType.popular: {
        args.element.addEventListener('change', () => {
          if (targetFilter === ParamsType.category) {
            if (!(myTarget instanceof HTMLInputElement)) {
              throw new Error('element is not HTMLInputElement');
            }
            isCheckedInputs(myTarget, 3, ParamsType.category);
          }
          if (targetFilter === ParamsType.genres) {
            if (!(myTarget instanceof HTMLInputElement)) {
              throw new Error('element is not HTMLInputElement');
            }
            isCheckedInputs(myTarget, 4, ParamsType.genres);
          }
          if (targetFilter === ParamsType.status) {
            if (!(myTarget instanceof HTMLInputElement)) {
              throw new Error('element is not HTMLInputElement');
            }
            isCheckedInputs(myTarget, 5, ParamsType.status);
          }
          if (targetFilter === ParamsType.popular) {
            if (!(myTarget instanceof HTMLInputElement)) {
              throw new Error('element is not HTMLInputElement');
            }
            isCheckedInputs(myTarget, 6, ParamsType.popular);
          }
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, sort.value, search.value);
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
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, sort.value, search.value);
        });
        break;
      }
      case ParamsType.sort:
        args.element.addEventListener('change', () => {
          const element = args.element as HTMLSelectElement;
          localStorage.setItem('sort', element.value);
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, element.value, search.value);
        });
        break;
      case ParamsType.search: {
        const closeButton: HTMLElement = State.elements.get('searchClose') as HTMLElement;
        const currSearch = State.elements.get('search') as HTMLInputElement;
        const element = args.element as HTMLInputElement;

        args.element.addEventListener('keyup', () => {
          const searchValue = localStorage.getItem('searchValue') || currSearch.value;
          if (searchValue !== '') {
            closeButton.classList.add('settings__search-close--active');
          } else {
            closeButton.classList.remove('settings__search-close--active');
          }
          localStorage.setItem('searchValue', element.value);
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, sort.value, element.value);
        });

        closeButton.addEventListener('click', () => {
          currSearch.value = '';
          localStorage.removeItem('searchValue');
          closeButton.classList.remove('settings__search-close--active');
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, sort.value, element.value);
        });
        break;
      }
      case ParamsType.resetFilters:
      case ParamsType.resetSettings: {
        args.element.addEventListener('click', () => {
          if (args.targetType === ParamsType.resetFilters) {
            deleteActiveClass(listeners as (HTMLLabelElement | HTMLInputElement)[][]);
            const inputsAndButtonsElements = [
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
              'quantity',
              'year',
              'yearFilter',
              'quantityFilter',
            ];
            inputsAndButtonsElements.forEach((el) => {
              localStorage.removeItem(el);
            });
            const quantityRange = State.elements.get('quantityRange');
            const yearsRange = State.elements.get('yearsRange');
            if (!(quantityRange instanceof HTMLDivElement) || !(yearsRange instanceof HTMLDivElement)) {
              throw new Error('Range is not instance of HTMLDivElement');
            }
            const setDefaultValue = (range: target, value: number[]) => {
              range.noUiSlider?.set(value);
            };

            setDefaultValue(quantityRange, [0, 20]);
            setDefaultValue(yearsRange, [2006, 2022]);
          }
          if (args.targetType === ParamsType.resetSettings) {
            localStorage.clear();
            window.location.reload();
          }
          this.generateFilteredDataOnPage(wrapperCallback, callbacks, currentData, sort.value, search.value);
        });
        break;
      }
      default:
    }
  }

  protected generateFilteredDataOnPage(
    generateProduct: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement,
    callbacks: ICallbacks,
    data: IProduct[],
    targetSort: string,
    targetSearch: string
  ) {
    const inputsElements = [
      'quantityFilter',
      'yearFilter',
      'marvel',
      'dc',
      'other',
      'action',
      'superhero',
      'sci-fi',
      'ongoing',
      'completed',
      'rating',
    ];
    const filtersFromLocal: IFiltersType[] = [];
    inputsElements.forEach((el) => {
      if (el in localStorage) {
        const input = JSON.parse(localStorage.getItem(el) ?? '');
        filtersFromLocal.push(input);
      }
    });
    State.syncFiltersWithLocalStorage(filtersFromLocal);
    const searchValue = localStorage.getItem('searchValue') || targetSearch;
    const search = State.elements.get('search') as HTMLInputElement;
    search.value = searchValue;
    search.focus();

    const filteredData = this.filter.filterData(data, State.filters);
    const sortedBy = localStorage.getItem('sort') ?? targetSort;
    const sortedData = this.sort.sortData(filteredData, sortedBy);
    const filteredByAll = this.filter.filterBySearch(searchValue, sortedData);

    const closeButton: HTMLElement = State.elements.get('searchClose') as HTMLElement;
    if (searchValue !== '') {
      closeButton.classList.add('settings__search-close--active');
    } else {
      closeButton.classList.remove('settings__search-close--active');
    }
    generateProduct(callbacks, filteredByAll);
    const generateNotFound = (searchedValue: string, arr: IProduct[]) => {
      if ((searchedValue !== '' && arr.length === 0) || arr.length === 0) {
        const products = State.elements.get('productsWrapper') as HTMLElement;
        const h2 = document.createElement('h2');
        h2.classList.add('products__title');
        h2.innerText = 'Ничего не найдено';
        products.append(h2);
      }
    };
    generateNotFound(searchValue, filteredByAll);
  }
}

export default Filters;
