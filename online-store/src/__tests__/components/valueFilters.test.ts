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
  it('createInput should be equal', () => {
    const createInput = instance.createInput('marvel', 'category');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('settings__input');
    input.name = 'category';
    input.value = 'marvel';
    expect(createInput).toEqual(input);
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });

  it('spyOn .toBeCalled', () => {
    const spy = jest.spyOn(instance, 'enableListeners');
    const inputMarvel = instance.createInput('marvel', 'category');
    const labelMarvel = instance.createLabel('Marvel');
    const listeners = [[inputMarvel, labelMarvel]];

    instance.enableListeners(listeners);
    expect(spy).toBeCalled();
  });
});
