import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Listing from './components/Listing';
import Detail from './components/Detail';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { Router } from '@reach/router';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Listing path="/" />
        <Detail path="order/:id" />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
