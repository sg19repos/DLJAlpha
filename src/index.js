import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Services/store';

const title = 'DLJ Alpha';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App title={title} />
        </HashRouter>
    </Provider>,
    document.getElementById('app'),
);

module.hot.accept();
