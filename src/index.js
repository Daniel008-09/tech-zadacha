import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ContactManager from './App';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <ContactManager />
  </Provider>,
  document.getElementById('root')
);
