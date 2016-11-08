import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import AuthService from './utils/AuthService'
import Home from './components/Home';
import Post from './components/Post';
import Browse from './components/Browse';
// import App from './components/App';
import Container from './components/Container';
import Login from './components/Login';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN}  from './.env'



const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);



const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}


const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRoute component={Home} onEnter={requireAuth}/>
      <Route path="/Post" component={Post} />
      <Route path="/Browse" component={Browse} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>
);

export default Routes;
