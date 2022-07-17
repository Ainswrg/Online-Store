import { IProduct } from '@core/ts/interfaces';

class Sort {
  sortData(data: IProduct[], targetSort: string): IProduct[] {
    const newData = data.sort((a, b) => {
      if (targetSort === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (targetSort === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      if (targetSort === 'price-asc') {
        return a.price - b.price;
      }
      if (targetSort === 'price-desc') {
        return b.price - a.price;
      }
      if (targetSort === 'date-asc') {
        return Date.parse(a.year) - Date.parse(b.year);
      }
      if (targetSort === 'date-desc') {
        return Date.parse(b.year) - Date.parse(a.year);
      }
      return 0;
    });
    return newData;
  }
}

export default Sort;
