import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Menu from "./routes/Menu.js";

import GuideInput from "./routes/GuideInput.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/menu" component={Menu} />
        <Route path="/guideInput" component={GuideInput} />
      </Switch>
    </Router>
  );
}
export default RouterConfig;
