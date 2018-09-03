import React, {Component, Fragment} from 'react';
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Header from "./components/Header"
import configureStore from "./redux/";
import Top from "./components/Top";

const store = configureStore();

const App = () => (
  <Fragment>
    <Header/>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Top}/>
        </Switch>
      </Router>
    </Provider>
  </Fragment>

);

export default App;
