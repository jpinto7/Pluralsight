import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import './assets/scss/app.scss';
import 'jquery';

const rootEl = document.getElementById('app');

ReactDOM.render(<Game/>, rootEl);

if (module.hot) {
  module.hot.accept();
}
