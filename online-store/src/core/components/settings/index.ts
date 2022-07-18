import State from '@core/state';
import Component from '@core/templates/component';
import { Buttons, ValueFilters, RangeFilters, Search, Sort } from '@core/components/';
import { TListenersElements } from '@core/ts/types';

class Settings extends Component {
  values = new Map<string, TListenersElements>();

  generateFiltersValue(): void {
    const filters = new ValueFilters('div', 'settings__filters');

    this.container.append(filters.render());
  }

  generateFiltersRange(): void {
    const filters = new RangeFilters('div', 'settings__filters');
    this.container.append(filters.render());
    const rangeInputs = filters.getInputs();
    const [quantityRange, yearsRange] = rangeInputs;

    State.addToElements('quantityRange', quantityRange);
    State.addToElements('yearsRange', yearsRange);
  }

  generateSorting() {
    const filters = document.createElement('div');
    filters.classList.add('settings__filters');

    const search = new Search('div', 'settings__search');
    const sort = new Sort('div', 'settings__sort');
    const buttons = new Buttons('div', 'settings__buttons');

    filters.append(search.render(), sort.render(), buttons.render());

    State.addToElements('search', search.getSearchValue());
    State.addToElements('sort', sort.getSelect());
    this.container.append(filters);
  }

  render() {
    this.generateFiltersValue();
    this.generateFiltersRange();
    this.generateSorting();
    return this.container;
  }
}

export default Settings;
