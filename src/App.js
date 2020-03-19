import React from 'react';
import logo from './logo.svg';
import * as Pages from './Pages '
//import {Route} from 'react-router'
import {
  Route,
  Router,
  Switch,
  BrowserRouter 
} from 'react-router-dom';


import './App.css';

const App= ()=> (
  <BrowserRouter>
    <Switch>
    <Route path='/' component={Pages.MainDash} />
    </Switch>
    </BrowserRouter>
  );


export default App;
