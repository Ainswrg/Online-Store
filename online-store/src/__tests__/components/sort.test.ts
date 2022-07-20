import Sort from '@core/components/ui/sort';

describe('Sort', () => {
  let instance: Sort;

  beforeEach(() => {
    instance = new Sort('div', 'settings');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Sort);
    expect(instance).toBeDefined();
  });
  it('generateSorting should be undefined', () => {
    const generateSorting = instance.generateSorting();
    expect(generateSorting).toBeUndefined();
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
