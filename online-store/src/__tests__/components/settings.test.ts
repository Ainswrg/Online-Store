import { Settings } from '@core/components';

describe('Settings', () => {
  let instance: Settings;

  beforeEach(() => {
    instance = new Settings('div', 'settings');
  });

  it('Settings should be defined', () => {
    expect(instance).toBeInstanceOf(Settings);
    expect(instance).toBeDefined();
  });
  it('generateFiltersValue should be undefined', () => {
    const generateFiltersValue = instance.generateFiltersValue();
    expect(generateFiltersValue).toBeUndefined();
  });
  it('generateFiltersRange should be undefined', () => {
    const generateFiltersRange = instance.generateFiltersRange();
    expect(generateFiltersRange).toBeUndefined();
  });
  it('generateSorting should be undefined', () => {
    const generateSorting = instance.generateSorting();
    expect(generateSorting).toBeUndefined();
  });
  it('generateSorting should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
