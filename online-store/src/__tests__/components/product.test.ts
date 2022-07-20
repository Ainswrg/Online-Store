import Product from '@core/components/product/index';

const data = {
  id: 1,
  title: 'Immortal X-Men (2022) #1',
  genres: ['Superhero'],
  quantity: 2,
  category: ['avengers', 'marvel'],
  price: 4.99,
  year: 'March 30, 2022',
  writer: 'Kieron Gillen',
  img: 'immortalx-men(2022)1',
  description:
    'IN THE QUIET COUNCIL, NO ONE CAN HEAR YOU SCREAM! The Quiet Council rules the Krakoan age, for better... or worse. Now, shaken by INFERNO and X LIVES / X DEATHS OF WOLVERINE they strive to hold together, no matter how much they want to tear each other apart. Writer Kieron Gillen (UNCANNY X-MEN, ETERNALS, The Wicked + The Divine, Die) returns to the world of X with artist Lucas Werneck (TRIAL OF MAGNETO) to bring us all into the room where it happens. “It” being “the most powerful people on Earth deciding the fate of the whole planet.” Prepare for sinister secrets to be revealed and learn that some secrets are more sinister than others...',
  rating: 4.15,
  status: 'ongoing',
};

describe('Product', () => {
  let instance: Product;

  beforeEach(() => {
    instance = new Product('div', 'product', data);
  });
  it('Product should be defined', () => {
    expect(instance).toBeInstanceOf(Product);
    expect(instance).toBeDefined();
  });
  it('generateButton should be defined', () => {
    const generateButton = instance.generateButton('button', 'button');
    expect(generateButton).toBeDefined();
  });
  it('generateProduct should be undefined', () => {
    const generateProduct = instance.generateProduct();
    expect(generateProduct).toBeUndefined();
  });
  it('render should be defined', () => {
    const render = instance.render();
    expect(render).toBeDefined();
  });
});
