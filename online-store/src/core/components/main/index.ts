import Component from '../../templates/component';

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
