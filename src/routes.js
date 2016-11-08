import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';
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
  debugger;
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
  if (auth.loggedIn()) {
    replace({ pathname: '/home' })
  }
}


const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="/home" component={Home} />
      <Route path="/Post" component={Post} />
      <Route path="/Browse" component={Browse} />
      <Route path="/login" component={Login} onEnter={requireAuth} />
    </Route>
  </Router>
);

export default Routes;
