import { IProduct, IFiltersType } from '@core/ts/interfaces';

class Filter {
  filterData(data: IProduct[], filtersType: IFiltersType[]): IProduct[] {
    const resCategory: IProduct[] = [];
    const resGenres: IProduct[] = [];
    const resStatus: IProduct[] = [];
    const resPopular: IProduct[] = [];
    const resQuantity: IProduct[] = [];
    const resYears: IProduct[] = [];

    const sortedTypes = filtersType.sort((a: IFiltersType, b: IFiltersType) => Number(a.id) - Number(b.id));
    sortedTypes.forEach((filters) => {
      const quantityOrArr = resQuantity.length === 0 ? data : resQuantity;
      const yearsOrQuantity = resYears.length === 0 ? quantityOrArr : resYears;
      const categoryOrYears = resCategory.length === 0 ? yearsOrQuantity : resCategory;
      const genresOrCategory = resGenres.length === 0 ? categoryOrYears : resGenres;
      const statusOrGenres = resStatus.length === 0 ? genresOrCategory : resStatus;

      if (filters.params === 'quantity') {
        const currentData = data;
        const [first, second] = filters.value.split(',');
        resQuantity.push(
          ...currentData.filter((item) => item.quantity >= Number(first) && item.quantity <= Number(second))
        );
      }
      if (filters.params === 'year') {
        const currentData = quantityOrArr;
        const [first, second] = filters.value.split(',');
        resYears.push(
          ...currentData.filter(
            (item) =>
              new Date(item.year) >= new Date(Number(first), 1, 1) &&
              new Date(item.year) <= new Date(Number(second), 12, 31)
          )
        );
      }
      if (filters.params === 'category') {
        const currentData = yearsOrQuantity;
        resCategory.push(...currentData.filter((item) => item.category.includes(filters.value)));
      }
      if (filters.params === 'genres') {
        const currentData = categoryOrYears;
        resGenres.push(...currentData.filter((item) => item.genres.includes(filters.value)));
      }
      if (filters.params === 'status') {
        const currentData = genresOrCategory;
        resStatus.push(...currentData.filter((item) => item.status.includes(filters.value)));
      }
      if (filters.params === 'rating') {
        const currentData = statusOrGenres;
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

    let res: IProduct[] = [];
    if (
      haveId(6) &&
      haveIdAndNotEmpty(1, resQuantity) &&
      haveIdAndNotEmpty(2, resYears) &&
      haveIdAndNotEmpty(3, resCategory) &&
      haveIdAndNotEmpty(4, resGenres) &&
      haveIdAndNotEmpty(5, resStatus)
    ) {
      res = resPopular;
    } else if (
      haveId(5) &&
      haveIdAndNotEmpty(1, resQuantity) &&
      haveIdAndNotEmpty(2, resYears) &&
      haveIdAndNotEmpty(3, resCategory) &&
      haveIdAndNotEmpty(4, resGenres)
    ) {
      res = resStatus;
    } else if (
      haveId(4) &&
      haveIdAndNotEmpty(1, resQuantity) &&
      haveIdAndNotEmpty(2, resYears) &&
      haveIdAndNotEmpty(3, resCategory)
    ) {
      res = resGenres;
    } else if (haveId(3) && haveIdAndNotEmpty(1, resQuantity) && haveIdAndNotEmpty(2, resYears)) {
      res = resCategory;
    } else if (haveId(2) && haveIdAndNotEmpty(1, resQuantity)) {
      res = resYears;
    } else if (haveId(1)) {
      res = resQuantity;
    } else {
      res = data;
    }

    return res;
  }

  filterBySearch = (searchValue: string, data: IProduct[]) => {
    if (searchValue !== '') {
      const newData = data.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return true;
        }
        return false;
      });
      return newData;
    }
    return data;
  };
}

export default Filter;
