import Component from '@core/templates/component';

class ValueFilters extends Component {
  private enableListeners(arr: (HTMLLabelElement | HTMLInputElement)[][]): void {
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

  private createInput = (value: string, name: string): HTMLInputElement => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('settings__input');
    input.name = name;
    input.value = value;
    return input;
  };
  private createLabel = (value: string): HTMLLabelElement => {
    const label = document.createElement('label');
    label.classList.add('settings__label');
    label.textContent = value;
    return label;
  };

  private generateFilters(): void {
    const title = document.createElement('h2');
    title.classList.add('settings__title');
    title.textContent = 'Фильтры по значению';

    //  create category filter
    const category = document.createElement('div');
    category.classList.add('settings__category');
    const subtitle = document.createElement('h3');
    subtitle.classList.add('settings__subtitle');
    subtitle.textContent = 'Категория:';
    const inputMarvel = this.createInput('marvel', 'category');
    const labelMarvel = this.createLabel('Marvel');
    const inputDC = this.createInput('dc', 'category');
    const labelDC = this.createLabel('DC');
    const inputOther = this.createInput('other', 'category');
    const labelOther = this.createLabel('Other');

    //  create genre filter
    const genre = document.createElement('div');
    genre.classList.add('settings__genre');
    const subtitleGenre = document.createElement('h3');
    subtitleGenre.classList.add('settings__subtitle');
    subtitleGenre.textContent = 'Жанр:';
    const inputSuperhero = this.createInput('superhero', 'genre');
    const labelSuperhero = this.createLabel('Superhero');
    const inputAction = this.createInput('action', 'genre');
    const labelAction = this.createLabel('Action');
    const inputScience = this.createInput('science-fiction', 'genre');
    const labelScience = this.createLabel('Science-fiction');

    //  create status filter
    const status = document.createElement('div');
    status.classList.add('settings__status');
    const subtitleStatus = document.createElement('h3');
    subtitleStatus.classList.add('settings__subtitle');
    subtitleStatus.textContent = 'Статус:';
    const inputOngoing = this.createInput('ongoing', 'status');
    const labelOngoing = this.createLabel('Ongoing');
    const inputCompleted = this.createInput('completed', 'status');
    const labelCompleted = this.createLabel('Completed');

    //  create format filter
    const popular = document.createElement('div');
    popular.classList.add('settings__popular');
    const subtitlePopular = document.createElement('h3');
    subtitlePopular.classList.add('settings__subtitle');
    subtitlePopular.textContent = 'Популярные:';
    const inputPopular = this.createInput('popular', 'popular');
    const labelPopular = this.createLabel('Popular');

    //  append all elements
    labelMarvel.append(inputMarvel);
    labelDC.append(inputDC);
    labelOther.append(inputOther);
    category.append(subtitle, labelMarvel, labelDC, labelOther);

    labelSuperhero.append(inputSuperhero);
    labelAction.append(inputAction);
    labelScience.append(inputScience);
    genre.append(subtitleGenre, labelSuperhero, labelAction, labelScience);

    labelOngoing.append(inputOngoing);
    labelCompleted.append(inputCompleted);
    status.append(subtitleStatus, labelOngoing, labelCompleted);

    labelPopular.append(inputPopular);
    popular.append(subtitlePopular, labelPopular);

    this.container.append(title, category, genre, status, popular);

    //  add event listeners
    const listeners = [
      [inputMarvel, labelMarvel],
      [inputDC, labelDC],
      [inputOther, labelOther],
      [inputSuperhero, labelSuperhero],
      [inputAction, labelAction],
      [inputScience, labelScience],
      [inputOngoing, labelOngoing],
      [inputCompleted, labelCompleted],
      [inputPopular, labelPopular],
    ];
    this.enableListeners(listeners);
  }

  render() {
    this.generateFilters();
    return this.container;
  }
}

export default ValueFilters;
