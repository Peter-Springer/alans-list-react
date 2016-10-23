import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Home from './components/Home';

import App from './components/App';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default Routes;
