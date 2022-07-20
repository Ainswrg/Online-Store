import ValueFilters from '@core/components/ui/valueFilters';

describe('ValueFilters', () => {
  let instance: ValueFilters;

  beforeEach(() => {
    instance = new ValueFilters('div', 'settings');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(ValueFilters);
    expect(instance).toBeDefined();
  });
  it('generateFilters should be undefined', () => {
    const generateFilters = instance.generateFilters();
    expect(generateFilters).toBeUndefined();
  });
  it('createLabel should be defined', () => {
    const createLabel = instance.createLabel('label');
    expect(createLabel.nodeType).toBeDefined();
  });
  it('createInput should be defined', () => {
    const createInput = instance.createInput('marvel', 'category');
    expect(createInput).toBeDefined();
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
