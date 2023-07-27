import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import './index.css';
import App from './app';
import store from './store';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
