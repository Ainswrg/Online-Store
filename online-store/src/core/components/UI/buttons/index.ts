import Component from '@core/templates/component';

class Buttons extends Component {
  private generateButtons() {
    const buttonResetFilters = document.createElement('button');
    buttonResetFilters.classList.add('settings__button');
    buttonResetFilters.textContent = 'Сбросить Фильтры';

    const buttonResetSettings = document.createElement('button');
    buttonResetSettings.classList.add('settings__button');
    buttonResetSettings.textContent = 'Сбросить Настройки';

    this.container.append(buttonResetFilters, buttonResetSettings);
  }

  public render() {
    this.generateButtons();
    return this.container;
  }
}

export default Buttons;
