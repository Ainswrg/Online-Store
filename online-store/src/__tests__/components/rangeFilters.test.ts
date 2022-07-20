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
  it('generateFilters should be generate', () => {
    const rangeValuesYears = document.createElement('div');
    const inputMinYears = document.createElement('input');
    inputMinYears.type = 'number';
    const inputMaxYears = document.createElement('input');
    inputMaxYears.type = 'number';
    const rangeSliderInit = instance.rangeSliderInit(rangeValuesYears, inputMinYears, inputMaxYears, 2006, 2022);
    expect(rangeSliderInit).toEqual(rangeValuesYears);
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
