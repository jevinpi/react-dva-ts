import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';

const menuGlobal = [
    {
        id: 'app',
        pid: 0,
        name: 'app',
        path: '/',
        models: () => [import('models/app')],
        component: () => import('pages/index'),
    },
    {
        id: 'detail',
        pid: 0,
        name: 'detail',
        path: '/detail',
        models: () => [import('models/test')],
        component: () => import('pages/detail'),
    },
];

function RouterConfig({ history, app }: any) {
    return (
        <div id="main-content">
            <Router history={history}>
                <Switch>
                    {menuGlobal.map(({ path, ...dynamics }, index) => (
                        <Route
                            key={index}
                            path={path}
                            exact
                            component={(dynamic as any)({ app, ...dynamics })}
                        />
                    ))}
                    <Redirect to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterConfig;
