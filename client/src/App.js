import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Navbar from './Components/layout/Navbar';
import Main from './Components/Pages/Main';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import { Container } from 'reactstrap';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className='container'>
          <Switch>
            <Route exact path='/Register' component={Register}></Route>
            <Route exact path='/Login' component={Login}></Route>
          </Switch>
          <Container>
            <Main></Main>
          </Container>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
