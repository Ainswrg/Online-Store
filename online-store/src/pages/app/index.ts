import Component from '../../core/templates/component';
import Page from '../../core/templates/page';
import MainPage from '../home';
import CartPage from '../cart';
import Header from '../../core/components/header';
import Main from '../../core/components/main';
import Footer from '../../core/components/footer';
import ErrorPage, { ErrorTypes } from '../error';
import data from '../../fakeData.json';

export const enum PageIds {
  Home = 'main-page',
  Cart = 'cart-page',
  Default = 'current-page',
}

class App extends Component {
  private static body: HTMLElement = document.body;
  // private static defaultPageId: string = 'current-page';
  private main: Main;
  private header: Header;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${PageIds.Default}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.Home) {
      page = new MainPage(idPage, data);
    } else if (idPage === PageIds.Cart) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = PageIds.Default;
      const main = document.querySelector('.main');
      main?.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor(tagName: string, className: string) {
    super(tagName, className);
    this.header = new Header('header', 'header');
    this.main = new Main('main', 'main');
    this.footer = new Footer('footer', 'footer');
  }

  generatePage() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('page-wrapper');
    wrapper.append(this.header.render());
    wrapper.append(this.main.render());
    wrapper.append(this.footer.render());
    App.body.append(wrapper);
  }

  run() {
    this.generatePage();
    this.enableRouteChange();
    App.renderNewPage('main-page');
  }
}

export default App;
