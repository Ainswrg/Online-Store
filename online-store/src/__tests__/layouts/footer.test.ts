import Footer from '@core/layouts/footer';

describe('Header', () => {
  let instance: Footer;

  beforeEach(() => {
    instance = new Footer('footer', 'footer');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Footer);
    expect(instance).toBeDefined();
  });
  it('should be undefined render', () => {
    instance.renderFooterContent();
    expect(instance.renderFooterContent()).toBeUndefined();
  });
  it('should be defined', () => {
    expect(instance.render()).toBeDefined();
  });
});
