import Component from '@core/templates/component';

class Search extends Component {
  generateSearch() {
    const searchInput = document.createElement('input');
    searchInput.classList.add('settings__search-input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Поиск';

    this.container.append(searchInput);
  }

  render() {
    this.generateSearch();
    return this.container;
  }
}

export default Search;
