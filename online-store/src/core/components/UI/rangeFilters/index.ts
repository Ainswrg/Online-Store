import Component from '@core/templates/component';
import noUiSlider, { target } from 'noUiSlider';

class RangeFilters extends Component {
  private generateFilters(): void {
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

    this.rangeSliderInit(rangeQuantity, inputMinQuantity, inputMaxQuantity, 1, 20);
    this.rangeSliderInit(rangeYears, inputMinYears, inputMaxYears, 2006, 2022);

    rangeValuesQuantity.append(inputMinQuantity, inputMaxQuantity);
    rangeValuesYears.append(inputMinYears, inputMaxYears);
    quantity.append(subtitle, rangeQuantity, rangeValuesQuantity);
    years.append(subtitleYears, rangeYears, rangeValuesYears);
    this.container.append(title, quantity, years);
  }

  private rangeSliderInit(
    range: target,
    inputMin: HTMLInputElement,
    inputMax: HTMLInputElement,
    min: number,
    max: number
  ): void {
    const inputs: Array<HTMLInputElement> = [inputMin, inputMax];

    noUiSlider.create(range, {
      start: [min, max],
      connect: true,
      padding: 0,
      range: {
        min,
        max,
      },
      step: 1,
      format: {
        to: (value: number): number => {
          return Math.round(value);
        },
        from: (value: string): number | false => {
          return Math.round(+value);
        },
      },
    });

    range.noUiSlider!.on('update', (values: (string | number)[], handle: number) => {
      (inputs[handle].value as string | number) = values[handle];
    });

    inputMin.addEventListener('change', () => {
      range.noUiSlider!.set([inputMin.value, inputMax.value]);
    });

    inputMax.addEventListener('change', () => {
      range.noUiSlider!.set([inputMin.value, inputMax.value]);
    });
  }

  render() {
    this.generateFilters();
    return this.container;
  }
}

export default RangeFilters;
