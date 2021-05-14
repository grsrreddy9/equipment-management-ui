import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import thunkMiddleWare from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import appReducer from './store';
import './index.css';
import App from './App';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleWare));
const reduxStore = createStore(appReducer, composedEnhancer);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
