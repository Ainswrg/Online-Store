import Component from '../../templates/components';
import { Url } from '../../ts/enum';

const Links = [
  {
    text: '2022 Original Ainswrg',
    url: Url.author,
  },
  {
    text: '<img class="logo" src="https://rs.school/images/rs_school_js.svg" alt="rs_school_js" id="rs" />',
    url: Url.school,
  },
];

class Footer extends Component {
  renderFooterContent() {
    const footerContent = document.createElement('ul');
    footerContent.classList.add('footer__contacts');
    const footerLi = document.createElement('li');
    footerLi.classList.add('footer__contacts-item');
    Links.forEach((link) => {
      const linkHTML = document.createElement('a');
      linkHTML.addEventListener('click', () => window.open(link.url));
      linkHTML.innerHTML = link.text;
      footerLi.append(linkHTML);
    });
    footerContent.append(footerLi);
    this.container.append(footerContent);
  }

  render() {
    this.renderFooterContent();
    return this.container;
  }
}

export default Footer;
