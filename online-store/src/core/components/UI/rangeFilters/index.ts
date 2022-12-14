import State from '@core/state';
import Component from '@core/templates/component';
import InitSliders from './InitSliders';

class RangeFilters extends Component {
  inputs: HTMLElement[] = [];
  generateFilters(): void {
    const title = document.createElement('h2');
    title.classList.add('settings__title');
    title.textContent = 'Фильтры по значению';

    const quantity = document.createElement('div');
    quantity.classList.add('range');

    const subtitle = document.createElement('h3');
    subtitle.classList.add('range__subtitle');
    subtitle.textContent = 'Количество на складе';

    const rangeValuesQuantity = document.createElement('div');
    rangeValuesQuantity.classList.add('range__values');

    const inputMinQuantity = document.createElement('input');
    inputMinQuantity.classList.add('range__input');
    inputMinQuantity.type = 'number';

    const inputMaxQuantity = document.createElement('input');
    inputMaxQuantity.classList.add('range__input');
    inputMaxQuantity.type = 'number';

    const rangeQuantity = document.createElement('div');
    rangeQuantity.classList.add('range__slider');

    const years = document.createElement('div');
    years.classList.add('range');

    const subtitleYears = document.createElement('h3');
    subtitleYears.classList.add('range__subtitle');
    subtitleYears.textContent = 'Год публикации';

    const rangeValuesYears = document.createElement('div');
    rangeValuesYears.classList.add('range__values');

    const inputMinYears = document.createElement('input');
    inputMinYears.classList.add('range__input');
    inputMinYears.type = 'number';

    const inputMaxYears = document.createElement('input');
    inputMaxYears.classList.add('range__input');
    inputMaxYears.type = 'number';

    const rangeYears = document.createElement('div');
    rangeYears.classList.add('range__slider');

    // ToDo Перенести код в отдельный файл
    const quantityValues: number[] = 'quantity' in localStorage && JSON.parse(localStorage.getItem('quantity') ?? '');
    const yearsValues: number[] = 'year' in localStorage && JSON.parse(localStorage.getItem('year') ?? '');

    const [minQuantity, maxQuantity] = quantityValues || [0, 20];
    const [minYears, maxYears] = yearsValues || [2006, 2022];

    inputMinQuantity.value = minQuantity.toString();
    inputMaxQuantity.value = maxQuantity.toString();

    inputMinYears.value = minYears.toString();
    inputMaxYears.value = maxYears.toString();

    rangeValuesQuantity.append(inputMinQuantity, inputMaxQuantity);
    rangeValuesYears.append(inputMinYears, inputMaxYears);
    quantity.append(subtitle, rangeQuantity, rangeValuesQuantity);
    years.append(subtitleYears, rangeYears, rangeValuesYears);

    const yearsSlider = new InitSliders(rangeYears, inputMinYears, inputMaxYears, yearsValues, [2006, 2022]);
    const quantitySlider = new InitSliders(rangeQuantity, inputMinQuantity, inputMaxQuantity, quantityValues, [1, 20]);

    const quantityRange = quantitySlider.init();
    const yearsRange = yearsSlider.init();

    State.addToElements('quantityRange', quantityRange);
    State.addToElements('yearsRange', yearsRange);
    State.addToElements('inputMinQuantity', inputMinQuantity);
    State.addToElements('inputMaxQuantity', inputMaxQuantity);
    State.addToElements('inputMinYears', inputMinYears);
    State.addToElements('inputMaxYears', inputMaxYears);
    State.addToElements('rangeQuantity', rangeQuantity);
    State.addToElements('rangeYears', rangeYears);
    this.container.append(title, quantity, years);
  }

  render() {
    this.generateFilters();
    return this.container;
  }
}

export default RangeFilters;
