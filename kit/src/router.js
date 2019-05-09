import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect, routerRedux} from 'dva/router';
import dynamic from 'dva/dynamic';
import {LocaleProvider} from 'antd';
import App from './routes/app';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const {ConnectedRouter} = routerRedux;

const Routers = function({history, app}) {
  const error = dynamic({
    app,
    component: () => import('./routes/error')
  })

  const routes = [
    {
      path: '/example',
      models: () => [import('./models/example')],
      component: () => import('./routes/Example')
    },
    {
      path: '/strategyList',
      models: () => [import('./models/strategy')],
      component: () => import('./routes/strategy/strategyList')
    },
    {
      path: '/strategyAdd',
      models: () => [import('./models/strategy')],
      component: () => import('./routes/strategy/strategyAdd')
    },
    {
      path: '/strategyDetail/:id',
      models: () => [import('./models/strategy')],
      component: () => import('./routes/strategy/strategyAdd')
    },
    {
      path: '/account/:pw',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/index')
    },
    {
      path: '/account',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/all')
    },
    {
      path: '/kit',
      models: () => [import('./models/kit')],
      component: () => import('./routes/kit/index')
    },
    {
      path: '/kit/grid',
      models: () => [import('./models/kit')],
      component: () => import('./routes/kit/grid')
    },
    {
      path: '/kit/interest',
      models: () => [import('./models/kit')],
      component: () => import('./routes/kit/interest')
    },
    {
      path: '/kit/myInterest',
      models: () => [import('./models/kit')],
      component: () => import('./routes/kit/myInterest')
    }
  ]
  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/kit" />} />
            {
              routes.map(({path, ...dynamics}, key) =>
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              )
            }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
}

export default Routers;
