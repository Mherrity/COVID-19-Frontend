import React from 'react';
import logo from './logo.svg';
import * as Pages from './Pages '
import {Menu} from 'antd'
//import {Route} from 'react-router'
import {
  Route,
  Router,
  Switch,
  BrowserRouter 
} from 'react-router-dom';
import './App.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';





const App= ()=> (

  <BrowserRouter basename="/" >
    <Switch>
    <Route exact path='/' component={Pages.MainDash} />
    </Switch>
    <Switch>
    <Route exact path='/states' component={Pages.StatesDash} />
    </Switch>
    </BrowserRouter>

  );


export default App;
