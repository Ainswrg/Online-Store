const enum PageIds {
  Home = 'main-page',
  Cart = 'cart-page',
  Default = 'current-page',
}

const enum Url {
  author = 'https://github.com/Ainswrg',
  school = 'https://rs.school/',
}
const enum ErrorTypes {
  Error_404 = 404,
}

const enum ParamsType {
  category = 'category',
  genres = 'genres',
  status = 'status',
  popular = 'rating',
  quantity = 'quantity',
  year = 'year',
  sort = 'sort',
  search = 'search',
  resetFilters = 'resetFilters',
  resetSettings = 'resetSettings',
}

export { PageIds, Url, ErrorTypes, ParamsType };
