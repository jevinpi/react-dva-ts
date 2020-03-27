/**
 *  使用dva进行改造
 */
import 'styles/index.scss';
import * as serviceWorker from './serviceWorker';

import dva from 'dva';
import routeConfig from './config/route';
import appModel from './models/';
const history = require('history').createBrowserHistory;

const location = history();

// dva实例
const App = dva({
    history: location,
});
App.model(appModel);

App.router(routeConfig);

App.start('#root');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
