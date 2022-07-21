import noUiSlider, { target } from 'nouislider';

class InitSliders {
  inputMin: HTMLInputElement;
  inputMax: HTMLInputElement;
  range: target;
  values: number[];
  rangeValues: number[];
  constructor(
    range: target,
    inputMin: HTMLInputElement,
    inputMax: HTMLInputElement,
    values: number[],
    rangeValues: number[]
  ) {
    this.inputMin = inputMin;
    this.inputMax = inputMax;
    this.range = range;
    this.values = values;
    this.rangeValues = rangeValues;
  }

  check(range: target, min: HTMLInputElement, max: HTMLInputElement, values: number[], rangeValues: number[]) {
    const [minV, maxV] = values || rangeValues;
    this.inputMin.value = minV.toString();
    this.inputMax.value = maxV.toString();
    range.noUiSlider?.set([min.value, max.value]);
  }

  rangeSliderInit(
    range: target,
    inputMin: HTMLInputElement,
    inputMax: HTMLInputElement,
    rangeValues: number[]
  ): target {
    const inputs: Array<HTMLInputElement> = [inputMin, inputMax];
    const [min, max] = rangeValues;
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
        to: (value: number): string | number => {
          return Math.round(value);
        },
        from: (value: string): number | false => {
          return Math.round(+value);
        },
      },
    });

    range.noUiSlider!.on('update', (values: (string | number)[], handle: number) => {
      inputs[handle].value = values[handle].toString();
    });

    inputMin.addEventListener('change', () => {
      range.noUiSlider!.set([inputMin.value, inputMax.value]);
    });

    inputMax.addEventListener('change', () => {
      range.noUiSlider!.set([inputMin.value, inputMax.value]);
    });

    return range;
  }

  init() {
    const currRange = this.rangeSliderInit(this.range, this.inputMin, this.inputMax, this.rangeValues);

    this.check(currRange, this.inputMin, this.inputMax, this.values, this.rangeValues);
    return currRange;
  }
}

export default InitSliders;
