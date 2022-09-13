import Filter from '@core/filters/filter';
import { IProduct, IResult } from '@core/ts/interfaces';

const data = [
  {
    id: 1,
    title: 'Avatar',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'completed',
  },
  {
    id: 2,
    title: 'Batman',
    genres: ['Superhero'],
    quantity: 6,
    category: ['dc'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'ongoing',
  },
  {
    id: 3,
    title: 'Deadpool',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'ongoing',
  },
  {
    id: 4,
    title: 'Thor',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'ongoing',
  },
  {
    id: 5,
    title: 'Hulk',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'completed',
  },
  {
    id: 6,
    title: 'Loki',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'completed',
  },
  {
    id: 7,
    title: 'Vision',
    genres: ['Superhero'],
    quantity: 6,
    category: ['avengers', 'marvel'],
    price: 3.99,
    year: 'May 16, 2018',
    writer: 'Jason Aaron',
    img: 'test',
    description: 'test',
    rating: 3.75,
    status: 'completed',
  },
];

describe('Filter', () => {
  let instance: Filter;

  beforeEach(() => {
    instance = new Filter();
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Filter);
    expect(instance).toBeDefined();
  });
  it('should filter by search data correctly', () => {
    const value = 'b';
    expect(instance.filterBySearch(value, data)[0].title).toEqual('Batman');
  });
  it('should filter data correctly', () => {
    const filters = [
      { id: 3, params: 'category', value: 'dc' },
      { id: 5, params: 'status', value: 'ongoing' },
    ];
    expect(instance.filterData(data, filters)[0].title).toEqual('Batman');
  });
  it('haveId should return true if id is in array', () => {
    const id = 3;
    const filters = [
      { id: 3, params: 'category', value: 'dc' },
      { id: 5, params: 'status', value: 'ongoing' },
    ];
    expect(instance.haveId(id, filters)).toBeTruthy();
  });
  it('haveIdAndNotEmpty should return true if id is in array and value is not empty', () => {
    const id = 3;
    const filters = [
      { id: 3, params: 'category', value: 'dc' },
      { id: 5, params: 'status', value: 'ongoing' },
    ];
    expect(instance.haveIdAndNotEmpty(id, data, filters)).toBeTruthy();
  });
  it('results should return correct data', () => {
    const filters = [
      { id: 1, params: 'quantity', value: '1,20' },
      { id: 2, params: 'year', value: '2006, 2022' },
      { id: 3, params: 'category', value: 'dc' },
      { id: 4, params: 'genre', value: 'Superhero' },
      { id: 5, params: 'status', value: 'ongoing' },
    ];
    const resQuantity: IProduct[] = data;
    const resYears: IProduct[] = data;
    const resCategory: IProduct[] = [
      {
        id: 2,
        title: 'Batman',
        genres: ['Superhero'],
        quantity: 6,
        category: ['dc'],
        price: 3.99,
        year: 'May 16, 2018',
        writer: 'Jason Aaron',
        img: 'test',
        description: 'test',
        rating: 3.75,
        status: 'ongoing',
      },
    ];
    const resGenres: IProduct[] = [
      {
        id: 2,
        title: 'Batman',
        genres: ['Superhero'],
        quantity: 6,
        category: ['dc'],
        price: 3.99,
        year: 'May 16, 2018',
        writer: 'Jason Aaron',
        img: 'test',
        description: 'test',
        rating: 3.75,
        status: 'ongoing',
      },
    ];
    const resStatus: IProduct[] = [
      {
        id: 2,
        title: 'Batman',
        genres: ['Superhero'],
        quantity: 6,
        category: ['dc'],
        price: 3.99,
        year: 'May 16, 2018',
        writer: 'Jason Aaron',
        img: 'test',
        description: 'test',
        rating: 3.75,
        status: 'ongoing',
      },
    ];
    const resPopular: IProduct[] = [];
    const allRes: IResult = {
      data,
      resQuantity,
      resYears,
      resCategory,
      resGenres,
      resStatus,
      resPopular,
    };
    expect(instance.filterInOneResultArray(allRes, filters)).toEqual([
      {
        id: 2,
        title: 'Batman',
        genres: ['Superhero'],
        quantity: 6,
        category: ['dc'],
        price: 3.99,
        year: 'May 16, 2018',
        writer: 'Jason Aaron',
        img: 'test',
        description: 'test',
        rating: 3.75,
        status: 'ongoing',
      },
    ]);
  });
});
