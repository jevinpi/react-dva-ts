import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import index from 'pages/index';
import detail from 'pages/detail';
const menuGlobal = [
    {
        id: 'app',
        name: 'app',
        path: '/',
        component: index,
    },
    {
        id: 'detail',
        name: 'detail',
        path: '/detail',
        component: detail,
    },
];

function RouterConfig() {
    return (
        <div id="main-content">
            <Router>
                <Switch>
                    {menuGlobal.map(({ path, component }, index) => (
                        <Route key={index} path={path} exact component={component} />
                    ))}
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterConfig;
