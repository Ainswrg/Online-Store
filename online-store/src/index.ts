import 'normalize.css';
import './index.scss';
import App from './pages/app';
import TaskCheck from './taskCheck';

window.onload = () => {
  const app = new App();
  app.run();
  new TaskCheck().console();
};
