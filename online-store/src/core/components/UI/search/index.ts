import State from '@core/state';
import Component from '@core/templates/component';

class Search extends Component {
  value: HTMLInputElement | null;

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.value = null;
  }

  generateSearch(): HTMLInputElement {
    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('settings__search-wrapper');

    const searchInput = document.createElement('input');
    searchInput.classList.add('settings__search-input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск';

    const closeButton = document.createElement('button');
    closeButton.classList.add('settings__search-close');
    closeButton.innerHTML = '&times;';

    State.addToElements('search', searchInput);
    State.addToElements('searchClose', closeButton);
    searchWrapper.append(searchInput, closeButton);
    this.container.append(searchWrapper);
    return searchInput;
  }

  render() {
    this.generateSearch();
    return this.container;
  }
}

export default Search;
