import Header from '@core/layouts/header';

describe('Header', () => {
  let instance: Header;

  beforeEach(() => {
    instance = new Header('header', 'header');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Header);
    expect(instance).toBeDefined();
  });
  it('should be undefined render buttons ', () => {
    instance.renderNavButtons();
    expect(instance.renderNavButtons()).toBeUndefined();
  });
  it('should be defined', () => {
    expect(instance.render()).toBeDefined();
  });
});
