import Sort from '@core/filters/sort';

const data = [
  {
    id: 1,
    title: 'a',
    price: 1,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'May 12, 2010',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
  {
    id: 2,
    title: 'b',
    price: 2,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'August 13, 2011',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
  {
    id: 3,
    title: 'c',
    price: 3,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'June 13, 2012',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
  {
    id: 4,
    title: 'd',
    price: 4,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'September 11, 2013',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
  {
    id: 5,
    title: 'e',
    price: 5,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'May 20, 2014',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
  {
    id: 6,
    title: 'f',
    price: 6,
    genres: ['test'],
    quantity: 5,
    writer: 'John Doe',
    category: ['test'],
    year: 'March 1, 2015',
    img: 'testPath',
    description: 'test',
    rating: 5,
    status: 'completed',
  },
];

describe('Sort', () => {
  let instance: Sort;

  beforeEach(() => {
    instance = new Sort();
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Sort);
    expect(instance).toBeDefined();
  });
  it('should sort correctly by name-asc', () => {
    const newData = instance.sortData(data, 'name-asc');
    expect(newData).toEqual(data.sort((a, b) => a.title.localeCompare(b.title)));
  });
  it('should sort correctly by name-desc', () => {
    const newData = instance.sortData(data, 'name-desc');
    expect(newData).toEqual(data.sort((a, b) => b.title.localeCompare(a.title)));
  });
  it('should sort correctly by price-asc', () => {
    const newData = instance.sortData(data, 'price-asc');
    expect(newData).toEqual(data.sort((a, b) => a.price - b.price));
  });
  it('should sort correctly by price-desc', () => {
    const newData = instance.sortData(data, 'price-desc');
    expect(newData).toEqual(data.sort((a, b) => b.price - a.price));
  });
  it('should sort correctly by date-asc', () => {
    const newData = instance.sortData(data, 'date-asc');
    expect(newData).toEqual(data.sort((a, b) => Date.parse(a.year) - Date.parse(b.year)));
  });
  it('should sort correctly by date-desc', () => {
    const newData = instance.sortData(data, 'date-desc');
    expect(newData).toEqual(data.sort((a, b) => Date.parse(b.year) - Date.parse(a.year)));
  });
});
