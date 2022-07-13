import Component from '@core/templates/component';

class Sort extends Component {
  generateSorting() {
    const sortTitle = document.createElement('h3');
    sortTitle.classList.add('settings__sort-title');
    sortTitle.textContent = 'Сортировка';

    const sortSelect = document.createElement('select');
    sortSelect.classList.add('settings__sort-select');

    const sortSelectOption1 = document.createElement('option');
    sortSelectOption1.textContent = 'По названию А-Я';

    const sortSelectOption2 = document.createElement('option');
    sortSelectOption1.textContent = 'По названию Я-А';

    const sortSelectOption3 = document.createElement('option');
    sortSelectOption3.textContent = 'По цене по возрастанию';

    const sortSelectOption4 = document.createElement('option');
    sortSelectOption4.textContent = 'По цене по убыванию';

    const sortSelectOption5 = document.createElement('option');
    sortSelectOption5.textContent = 'По дате по возрастанию';

    const sortSelectOption6 = document.createElement('option');
    sortSelectOption6.textContent = 'По дате по убыванию';

    sortSelect.append(
      sortSelectOption1,
      sortSelectOption2,
      sortSelectOption3,
      sortSelectOption4,
      sortSelectOption5,
      sortSelectOption6
    );

    this.container.append(sortTitle, sortSelect);
  }

  render() {
    this.generateSorting();
    return this.container;
  }
}

export default Sort;
