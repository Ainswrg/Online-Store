import Component from '@core/templates/component';
import RangeFilters from '../rangeFilters';
import ValueFilters from '../valueFilters';

class Settings extends Component {
  value!: string | number;
  enableListeners(arr: (HTMLLabelElement | HTMLInputElement)[][]): void {
    const addEListener = (inputElement: Element, labelElement: Element): void => {
      inputElement.addEventListener('change', (e: Event) => {
        const myTarget = e.target as HTMLInputElement;
        if (myTarget.checked) {
          labelElement.classList.add('active');
        } else {
          labelElement.classList.remove('active');
        }
      });
    };
    arr.forEach(([input, label]) => {
      addEListener(input, label);
    });
  }

  generateFiltersValue(): void {
    const filters = new ValueFilters('div', 'settings__filters', this.enableListeners);
    this.container.append(filters.render());
  }

  generateFiltersRange(): void {
    const filters = new RangeFilters('div', 'settings__filters');
    this.container.append(filters.render());
  }
  generateSorting() {
    const filters = document.createElement('div');
    filters.classList.add('settings__filters');
    let template = '';
    template += `<h2 class="settings__title">Сортировка</h2>`;
    template += `<div class="settings__category">`;
    template += `<h3>Категория:</h3>`;
    template += `<input type="checkbox" id="marvel" value="marvel" name="category">`;
    template += `<label for="marvel">Superhero</label>`;
    template += `<input type="checkbox" id="dc" value="dc" name="category">`;
    template += `<label for="dc">DC</label>`;
    template += `</div>`;
    filters.innerHTML = template;
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
