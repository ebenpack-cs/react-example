import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './store';

import './index.css';
import App from './App';

const store = createStore();

ReactDOM.render(
    // Provider connects the store to our application. E.g. it's what makes `connect` work
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

