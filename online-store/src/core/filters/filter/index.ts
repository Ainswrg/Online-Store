import { ParamsType } from '@core/ts/enum';
import { IProduct, IFiltersType, IResult } from '@core/ts/interfaces';

class Filter {
  filterData(data: IProduct[], filtersType: IFiltersType[]): IProduct[] {
    const resCategory: IProduct[] = [];
    const resGenres: IProduct[] = [];
    const resStatus: IProduct[] = [];
    const resPopular: IProduct[] = [];
    const resQuantity: IProduct[] = [];
    const resYears: IProduct[] = [];

    const sortedFiltersType = filtersType.sort((a: IFiltersType, b: IFiltersType) => Number(a.id) - Number(b.id));

    sortedFiltersType.forEach((filters) => {
      const quantityOrData = resQuantity.length === 0 ? data : resQuantity;
      const yearsOrQuantity = resYears.length === 0 ? quantityOrData : resYears;
      const categoryOrYears = resCategory.length === 0 ? yearsOrQuantity : resCategory;
      const genresOrCategory = resGenres.length === 0 ? categoryOrYears : resGenres;
      const statusOrGenres = resStatus.length === 0 ? genresOrCategory : resStatus;

      switch (filters.params) {
        case ParamsType.quantity: {
          const [first, second] = filters.value.split(',');
          resQuantity.push(...data.filter((item) => item.quantity >= Number(first) && item.quantity <= Number(second)));
          break;
        }
        case ParamsType.year: {
          const [first, second] = filters.value.split(',');
          resYears.push(
            ...quantityOrData.filter(
              (item) =>
                new Date(item.year) >= new Date(Number(first), 0, 1) &&
                new Date(item.year) <= new Date(Number(second), 11, 31)
            )
          );
          break;
        }
        case ParamsType.category:
          resCategory.push(...yearsOrQuantity.filter((item) => item.category.includes(filters.value)));
          break;
        case ParamsType.genres:
          resGenres.push(...categoryOrYears.filter((item) => item.genres.includes(filters.value)));
          break;
        case ParamsType.status:
          resStatus.push(...genresOrCategory.filter((item) => item.status.includes(filters.value)));
          break;
        case ParamsType.popular:
          resPopular.push(...statusOrGenres.filter((item) => item.rating > 4.5));
          break;
        default:
      }
    });

    const allRes: IResult = {
      data,
      resQuantity,
      resYears,
      resCategory,
      resGenres,
      resStatus,
      resPopular,
    };

    const resultData = this.filterInOneResultArray(allRes, filtersType);

    return resultData;
  }
  haveId = (id: number, filters: IFiltersType[]) => filters.some((el) => el.id === id);
  haveIdAndNotEmpty = (id: number, arr: IProduct[], filters: IFiltersType[]) => {
    if (this.haveId(id, filters)) {
      return arr.length !== 0;
    }
    return true;
  };
  filterInOneResultArray(arr: IResult, filters: IFiltersType[]) {
    let res: IProduct[] = [];
    if (
      this.haveId(6, filters) &&
      this.haveIdAndNotEmpty(1, arr.resQuantity, filters) &&
      this.haveIdAndNotEmpty(2, arr.resYears, filters) &&
      this.haveIdAndNotEmpty(3, arr.resCategory, filters) &&
      this.haveIdAndNotEmpty(4, arr.resGenres, filters) &&
      this.haveIdAndNotEmpty(5, arr.resStatus, filters)
    ) {
      res = arr.resPopular;
    } else if (
      this.haveId(5, filters) &&
      this.haveIdAndNotEmpty(1, arr.resQuantity, filters) &&
      this.haveIdAndNotEmpty(2, arr.resYears, filters) &&
      this.haveIdAndNotEmpty(3, arr.resCategory, filters) &&
      this.haveIdAndNotEmpty(4, arr.resGenres, filters)
    ) {
      res = arr.resStatus;
    } else if (
      this.haveId(4, filters) &&
      this.haveIdAndNotEmpty(1, arr.resQuantity, filters) &&
      this.haveIdAndNotEmpty(2, arr.resYears, filters) &&
      this.haveIdAndNotEmpty(3, arr.resCategory, filters)
    ) {
      res = arr.resGenres;
    } else if (
      this.haveId(3, filters) &&
      this.haveIdAndNotEmpty(1, arr.resQuantity, filters) &&
      this.haveIdAndNotEmpty(2, arr.resYears, filters)
    ) {
      res = arr.resCategory;
    } else if (this.haveId(2, filters) && this.haveIdAndNotEmpty(1, arr.resQuantity, filters)) {
      res = arr.resYears;
    } else if (this.haveId(1, filters)) {
      res = arr.resQuantity;
    } else {
      res = arr.data;
    }
    return res;
  }
  filterBySearch = (searchValue: string, data: IProduct[]) => {
    if (searchValue !== '') {
      return data.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()));
    }
    return data;
  };
}

export default Filter;
