import React from 'react';
import { render } from 'react-dom';
import Router from './containers/Router';
require('./assets/style/chat.css');


render(<Router />, document.getElementById('app'));
