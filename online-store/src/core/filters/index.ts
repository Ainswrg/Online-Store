import { TListenersElements } from '@core/ts/types';
import { ICallbacks, IProduct, IValueFilterEnable, IFiltersType } from '@core/ts/interfaces';
import { ParamsType } from '@core/ts/enum';
import { target } from 'noUiSlider';
import Sort from './sort';
import Filter from './filter';

type TGetRes = number | string | (string | number)[];

class Filters {
  filters: IFiltersType[];
  updatedData: IProduct[];
  filter: Filter;
  sort: Sort;
  constructor() {
    this.filters = [];
    this.updatedData = [];
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

    const currentData = args.data;
    const isChecked = (targetElement: HTMLInputElement, id: number, paramsType: string) => {
      if (targetElement.name === 'genres') {
        const valueUppercase = targetElement.value[0].toUpperCase() + targetElement.value.slice(1);
        if (targetElement.checked) {
          this.filters.push({ id, params: paramsType, value: valueUppercase });
        } else {
          this.filters = this.filters.filter((el) => el.value !== valueUppercase);
        }
      } else if (targetElement.checked) {
        this.filters.push({ id, params: paramsType, value: targetElement.value });
      } else {
        this.filters = this.filters.filter((el) => el.value !== targetElement.value);
      }
    };

    const isUpdated = (value: TGetRes | undefined, id: number, paramsType: string) => {
      this.filters = this.filters.filter((el) => el.params !== paramsType);
      this.filters.push({ id, params: paramsType, value: `${value}` });
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
    if (args.targetType === 'sort') {
      args.element.addEventListener('change', () => {
        const element = args.element as HTMLSelectElement;
        this.filterOnPage(wrapperCallback, callbacks, currentData, element.value, mySearch.value);
      });
    }
    if (args.targetType === 'search') {
      args.element.addEventListener('keyup', () => {
        const element = args.element as HTMLInputElement;
        this.filterOnPage(wrapperCallback, callbacks, currentData, mySort.value, element.value);
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
    const filteredData = this.filter.filterData(data, this.filters);
    const sortedData = this.sort.sortData(filteredData, targetSort);
    const filteredBySearch = this.filter.filterBySearch(targetSearch, sortedData);
    generateProduct(callbacks, filteredBySearch);
  }
}

export default Filters;
