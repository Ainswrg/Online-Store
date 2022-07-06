import Component from '../../templates/components';

class Main extends Component {
  renderMain() {
    const main = document.createElement('main');
    main.classList.add('main');
  }

  render() {
    this.renderMain();
    return this.container;
  }
}

export default Main;
