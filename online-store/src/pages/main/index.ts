import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'GeekComics',
  };

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
