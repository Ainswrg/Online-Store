import Component from '@core/templates/component';
import { Buttons, ValueFilters, RangeFilters, Search, Sort } from '@core/components/';
import { TListenersElements } from '@core/ts/types';

class Settings extends Component {
  values = new Map<string, TListenersElements>();

  generateFiltersValue(): void {
    const filters = new ValueFilters('div', 'settings__filters');

    this.container.append(filters.render());
    const valueInputs = filters.getInputs();
    const [
      inputMarvel,
      inputDC,
      inputOther,
      inputSuperhero,
      inputAction,
      inputScience,
      inputOngoing,
      inputCompleted,
      inputPopular,
    ] = valueInputs;
    this.setValue('inputMarvel', inputMarvel);
    this.setValue('inputDC', inputDC);
    this.setValue('inputOther', inputOther);
    this.setValue('inputSuperhero', inputSuperhero);
    this.setValue('inputAction', inputAction);
    this.setValue('inputScience', inputScience);
    this.setValue('inputOngoing', inputOngoing);
    this.setValue('inputCompleted', inputCompleted);
    this.setValue('inputPopular', inputPopular);
  }

  generateFiltersRange(): void {
    const filters = new RangeFilters('div', 'settings__filters');
    this.container.append(filters.render());
    const rangeInputs = filters.getInputs();
    const [quantityRange, yearsRange] = rangeInputs;

    this.setValue('quantityRange', quantityRange);
    this.setValue('yearsRange', yearsRange);
  }

  generateSorting() {
    const filters = document.createElement('div');
    filters.classList.add('settings__filters');

    const search = new Search('div', 'settings__search');
    const sort = new Sort('div', 'settings__sort');
    const buttons = new Buttons('div', 'settings__buttons');

    filters.append(search.render(), sort.render(), buttons.render());

    this.setValue('search', search.getSearchValue());
    this.setValue('sort', sort.getSelect());
    const [buttonResetSettings, buttonResetFilters] = buttons.getButtons();
    this.setValue('buttonResetSettings', buttonResetSettings);
    this.setValue('buttonResetFilters', buttonResetFilters);
    this.container.append(filters);
  }

  getValues(): Map<string, TListenersElements> {
    return this.values;
  }

  setValue(name: string, value: TListenersElements | null): void {
    this.values.set(name, value);
  }

  render() {
    this.generateFiltersValue();
    this.generateFiltersRange();
    this.generateSorting();
    return this.container;
  }
}

export default Settings;
