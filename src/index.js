import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import '@csstools/normalize.css';
import 'typeface-roboto';
import App from './app/App';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
