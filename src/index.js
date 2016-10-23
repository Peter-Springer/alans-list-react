import React from 'react';
import { render } from 'react-dom';
import './styles/reset.css';
import './styles/App.css';
import {browserHistory} from 'react-router';
import Routes from './routes';

render(
   <Routes history={browserHistory}/>,
  document.getElementById('root')
);
