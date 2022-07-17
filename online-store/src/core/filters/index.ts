import { ICallbacks, IProduct, IValueFilterEnable, IFiltersType } from '@core/ts/interfaces';
import { ParamsType } from '@core/ts/enum';

class Filters {
  filters: IFiltersType[];
  updatedData: IProduct[];
  constructor() {
    this.filters = [];
    this.updatedData = [];
  }

  filterData(data: IProduct[], filtersType: IFiltersType[]): IProduct[] {
    const resCategory: IProduct[] = [];
    const resGenres: IProduct[] = [];
    const resStatus: IProduct[] = [];
    const resPopular: IProduct[] = [];

    const sortedTypes = filtersType.sort((a: IFiltersType, b: IFiltersType) => Number(a.id) - Number(b.id));
    sortedTypes.forEach((filters) => {
      if (filters.params === 'category') {
        resCategory.push(...data.filter((item) => item.category.includes(filters.value)));
      }
      if (filters.params === 'genres') {
        const currentData = resCategory.length === 0 ? data : resCategory;
        resGenres.push(...currentData.filter((item) => item.genres.includes(filters.value)));
      }
      if (filters.params === 'status') {
        const notEmpty: IProduct[] = resCategory.length === 0 ? data : resCategory;
        const currentData = resGenres.length === 0 ? notEmpty : resGenres;
        resStatus.push(...currentData.filter((item) => item.status.includes(filters.value)));
      }
      if (filters.params === 'rating') {
        let notEmpty: IProduct[] = [];
        if (resGenres.length === 0) {
          notEmpty = resCategory.length === 0 ? data : resCategory;
        } else {
          notEmpty = resGenres;
        }
        const currentData = resStatus.length === 0 ? notEmpty : resStatus;
        resPopular.push(...currentData.filter((item) => item.rating > 4.5));
      }
    });

    const haveId = (id: number) => filtersType.some((el) => el.id === id);
    const haveIdAndNotEmpty = (id: number, arr: IProduct[]) => {
      if (haveId(id)) {
        return arr.length !== 0;
      }
      return true;
    };

    let res = [];

    if (
      haveId(4) &&
      haveIdAndNotEmpty(1, resCategory) &&
      haveIdAndNotEmpty(2, resGenres) &&
      haveIdAndNotEmpty(3, resStatus)
    ) {
      res = resPopular;
    } else if (haveId(3) && haveIdAndNotEmpty(1, resCategory) && haveIdAndNotEmpty(2, resGenres)) {
      res = resStatus;
    } else if (haveId(2) && haveIdAndNotEmpty(1, resCategory)) {
      res = resGenres;
    } else if (haveId(1)) {
      res = resCategory;
    } else {
      res = data;
    }
    return res;
  }

  enableValueFilterListener(
    args: IValueFilterEnable,
    callbacks: ICallbacks,
    wrapperCallback: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement
  ): void {
    args.element.addEventListener('change', () => {
      const myTarget = args.element as HTMLInputElement;
      const currentData = args.data;
      const isChecked = (target: HTMLInputElement, id: number, paramsType: string) => {
        if (target.name === 'genres') {
          const valueUppercase = target.value[0].toUpperCase() + target.value.slice(1);
          if (target.checked) {
            this.filters.push({ id, params: paramsType, value: valueUppercase });
          } else {
            this.filters = this.filters.filter((el) => el.value !== valueUppercase);
          }
        } else if (target.checked) {
          this.filters.push({ id, params: paramsType, value: target.value });
        } else {
          this.filters = this.filters.filter((el) => el.value !== target.value);
        }
      };
      if (myTarget.name === ParamsType.category) {
        isChecked(myTarget, 1, ParamsType.category);
      }
      if (myTarget.name === ParamsType.genres) {
        isChecked(myTarget, 2, ParamsType.genres);
      }
      if (myTarget.name === ParamsType.status) {
        isChecked(myTarget, 3, ParamsType.status);
      }
      if (myTarget.name === ParamsType.popular) {
        isChecked(myTarget, 4, ParamsType.popular);
      }
      this.filterByValue(wrapperCallback, callbacks, currentData);
    });
  }

  filterByValue(
    generateProduct: (callbacks: ICallbacks, data: IProduct[]) => HTMLElement,
    callbacks: ICallbacks,
    data: IProduct[]
  ) {
    const currentData = this.filterData(data, this.filters);
    generateProduct(callbacks, currentData);
  }
}

export default Filters;
