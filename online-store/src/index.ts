import 'normalize.css';
import './index.scss';
import App from './pages/app';

window.onload = () => {
  const app = new App();
  app.run();
};
