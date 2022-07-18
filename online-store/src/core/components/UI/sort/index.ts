import State from '@core/state';
import Component from '@core/templates/component';

class Sort extends Component {
  static select: HTMLSelectElement | null = null;
  generateSorting() {
    const sortTitle = document.createElement('h3');
    sortTitle.classList.add('settings__sort-title');
    sortTitle.textContent = 'Сортировка';

    const sortSelect = document.createElement('select');
    sortSelect.classList.add('settings__sort-select');

    const sortSelectOption1 = document.createElement('option');
    sortSelectOption1.textContent = 'По названию А-Я';
    sortSelectOption1.value = 'name-asc';

    const sortSelectOption2 = document.createElement('option');
    sortSelectOption2.textContent = 'По названию Я-А';
    sortSelectOption2.value = 'name-desc';

    const sortSelectOption3 = document.createElement('option');
    sortSelectOption3.textContent = 'По цене возрастания';
    sortSelectOption3.value = 'price-asc';

    const sortSelectOption4 = document.createElement('option');
    sortSelectOption4.textContent = 'По цене убывания';
    sortSelectOption4.value = 'price-desc';

    const sortSelectOption5 = document.createElement('option');
    sortSelectOption5.textContent = 'По дате возрастания';
    sortSelectOption5.value = 'date-asc';

    const sortSelectOption6 = document.createElement('option');
    sortSelectOption6.textContent = 'По дате убывания';
    sortSelectOption6.value = 'date-desc';

    sortSelect.append(
      sortSelectOption1,
      sortSelectOption2,
      sortSelectOption3,
      sortSelectOption4,
      sortSelectOption5,
      sortSelectOption6
    );
    State.addToElements('sort', sortSelect);
    const sortedBy = localStorage.getItem('sort') ?? 'name-asc';
    const options = [
      sortSelectOption1,
      sortSelectOption2,
      sortSelectOption3,
      sortSelectOption4,
      sortSelectOption5,
      sortSelectOption6,
    ];
    options.forEach((option) => {
      if (option.value === sortedBy) {
        const myOption = option as HTMLOptionElement;
        myOption.selected = true;
      }
    });
    this.container.append(sortTitle, sortSelect);
  }

  render() {
    this.generateSorting();
    return this.container;
  }
}

export default Sort;
