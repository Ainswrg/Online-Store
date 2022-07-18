import State from '@core/state';
import Component from '@core/templates/component';

class Search extends Component {
  value: HTMLInputElement | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.value = null;
  }

  generateSearch(): HTMLInputElement {
    const searchInput = document.createElement('input');
    searchInput.classList.add('settings__search-input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск';

    State.addToElements('search', searchInput);
    this.container.append(searchInput);
    return searchInput;
  }

  render() {
    this.generateSearch();
    return this.container;
  }
}

export default Search;
