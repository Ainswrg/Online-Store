import { Main, Header, Footer } from '@core/layouts';
import Page from '@core/templates/page';
import { PageIds, ErrorTypes } from '@core/ts/enum';
import { MainPage, CartPage, ErrorPage } from '@pages/index';
import data from '@/fakeData.json';

class App {
  private static body: HTMLElement = document.body;
  private static url: string | null = PageIds.Default;
  private static main: Main = new Main('main', 'main');
  private static header: Header = new Header('header', 'header');
  private static footer: Footer = new Footer('footer', 'footer');

  static renderNewPage(idPage: string) {
    if (App.url) {
      App.url = null;
    }
    let page: Page | null = null;

    if (idPage === PageIds.Home) {
      page = new MainPage(idPage, data);
      App.url = idPage;
    } else if (idPage === PageIds.Cart) {
      page = new CartPage(idPage);
      App.url = idPage;
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
      App.url = idPage;
    }

    if (page) {
      const pageHTML = page.render();
      App.url = PageIds.Default;
      App.main.rerender().append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  generatePage() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('page-wrapper');
    wrapper.append(App.header.render());
    wrapper.append(App.main.render());
    wrapper.append(App.footer.render());
    App.body.append(wrapper);
  }

  run() {
    this.generatePage();
    this.enableRouteChange();
    App.renderNewPage('main-page');
  }
}

export default App;
