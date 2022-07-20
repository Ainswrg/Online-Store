import Main from '@core/layouts/main';

describe('Main', () => {
  let instance: Main;

  beforeEach(() => {
    instance = new Main('main', 'main');
  });

  it('should be defined', () => {
    expect(instance).toBeInstanceOf(Main);
    expect(instance).toBeDefined();
  });
  it('should render correctly', () => {
    expect(instance).toBeInstanceOf(Main);
    const main = document.createElement('main');
    main.classList.add('main');
    expect(instance.render()).toEqual(main);
  });
});
