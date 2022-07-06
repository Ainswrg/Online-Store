import Component from '../../templates/components';
import { PageIds } from '../../ts/enum';

const Buttons = [
  {
    id: PageIds.Home,
    text: 'GeekComics',
  },
  {
    id: PageIds.Cart,
    text: 'Cart',
  },
];

class Header extends Component {
  renderNavButtons() {
    const navButtons = document.createElement('div');
    navButtons.classList.add('header__navigation');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      navButtons.append(buttonHTML);
    });
    this.container.append(navButtons);
  }

  render() {
    this.renderNavButtons();
    console.log('t', this.container);
    return this.container;
  }
}

export default Header;
