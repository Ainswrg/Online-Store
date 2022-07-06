import Page from '../../core/templates/page';
import MainPage from '../main';
import CartPage from '../cart';
import Header from '../../core/components/header';
import Main from '../../core/components/main';
import Footer from '../../core/components/footer';
import ErrorPage, { ErrorTypes } from '../error';

export const enum PageIds {
  Home = 'main-page',
  Cart = 'cart-page',
}

class App {
  private static body: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  private main: Main;
  private header: Header;
  private footer: Footer;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.Home) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.Cart) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      console.log('pageHTML', pageHTML);
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

  constructor() {
    this.header = new Header('header', 'header');
    this.main = new Main('main', 'main');
    this.footer = new Footer('footer', 'footer');
  }

  run() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('page-wrapper');
    wrapper.append(this.header.render());
    wrapper.append(this.main.render());
    wrapper.append(this.footer.render());
    this.enableRouteChange();
    App.body.append(wrapper);
    App.renderNewPage('main-page');
  }
}

export default App;
