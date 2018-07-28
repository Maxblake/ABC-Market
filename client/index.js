import React from 'react';
import ReactDOM from 'react-dom';
import './src/index.css';
import App from './src/App';
import registerServiceWorker from './src/registerServiceWorker';
import Auth from './src/Provider/Auth'


ReactDOM.render(<Auth> <App /> </Auth>, document.getElementById('main'));
registerServiceWorker();
