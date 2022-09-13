import RangeFilters from '@core/components/ui/rangeFilters';

describe('RangeFilters', () => {
  let instance: RangeFilters;

  beforeEach(() => {
    instance = new RangeFilters('div', 'settings');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(RangeFilters);
    expect(instance).toBeDefined();
  });
  it('generateFilters should be undefined', () => {
    const generateFilters = instance.generateFilters();
    expect(generateFilters).toBeUndefined();
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
