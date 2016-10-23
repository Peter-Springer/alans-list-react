import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import Post from './components/Post';
import Browse from './components/Browse';

import App from './components/App';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/Post" component={Post} />
      <Route path="/Browse" component={Browse} />
    </Route>
  </Router>
);

export default Routes;
