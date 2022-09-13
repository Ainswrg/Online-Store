import Search from '@core/components/ui/search';

describe('Search', () => {
  let instance: Search;

  beforeEach(() => {
    instance = new Search('div', 'settings');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Search);
    expect(instance).toBeDefined();
  });
  it('generateSearch should be defined', () => {
    const generateSearch = instance.generateSearch();
    expect(generateSearch).toBeDefined();
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
