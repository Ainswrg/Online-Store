import { IProduct } from '@core/ts/interfaces';

class Sort {
  sortData(data: IProduct[], targetSort: string): IProduct[] {
    const newData = data.sort((a, b) => {
      switch (targetSort) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-asc':
          return Date.parse(a.year) - Date.parse(b.year);
        case 'date-desc':
          return Date.parse(b.year) - Date.parse(a.year);
        default:
          return 0;
      }
    });
    return newData;
  }
}

export default Sort;
