import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/auth/Login';
import PasswordPage from './Components/Pages/PassworPage';
import Navbar from './Components/layout/Navbar';
import Main from './Components/Pages/Main';
import { Provider } from 'react-redux';

import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className='container'>
          <Switch>
            <Route exact path='/' component={Main}></Route>
            <Route exact path='/Login' component={Login}></Route>
            <Route
              exact
              path='/PasswordPage/:token'
              component={PasswordPage}
            ></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
