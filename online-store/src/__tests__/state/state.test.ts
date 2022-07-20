import State from '@core/state';

describe('State', () => {
  let instance: State;

  beforeEach(() => {
    instance = new State();
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(State);
    expect(instance).toBeDefined();
  });
  it('addToElements should be add element', () => {
    const div = document.createElement('div');
    State.addToElements('test', div);
    expect(State.elements.get('test')).toEqual(div);
  });
  it('getElements should be return elements state', () => {
    const div = document.createElement('div');
    State.addToElements('test', div);
    expect(State.getElements()).toEqual(State.elements);
  });
  it('addToCart should be add cart', () => {
    const div = document.createElement('div');
    State.addToCart('test', div);
    expect(State.cart.get('test')).toEqual(div);
  });
  it('removeFromCart should be remove cart', () => {
    const div = document.createElement('div');
    State.addToCart('test', div);
    expect(State.removeFromCart('test')).toBeFalsy();
  });
  it('getCart should be return cart', () => {
    expect(State.getCart()).toEqual(State.cart);
  });
  it('addToFilters should be add filter', () => {
    const filter = {
      id: 1,
      params: 'test',
      value: 'test',
    };
    State.addToFilters(filter);
    expect(State.getFilters()).toEqual([
      {
        id: 1,
        params: 'test',
        value: 'test',
      },
    ]);
  });
  it('removeFromFilters should be remove filter', () => {
    State.removeFromFilters('test');
    expect(State.getFilters()).toEqual([]);
  });
  it('getFilters should be return filters', () => {
    expect(State.getFilters()).toEqual(State.filters);
  });
  it('syncFiltersWithLocalStorage should be sync filters with local storage', () => {
    const filters = [
      {
        id: 1,
        params: 'test',
        value: 'test',
      },
    ];
    State.syncFiltersWithLocalStorage(filters);
    expect(State.getFilters()).toEqual(filters);
  });
});
