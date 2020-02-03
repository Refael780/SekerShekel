import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/auth/Login';
import PasswordPage from './Components/Pages/PassworPage';
import Navbar from './Components/layout/Navbar';
import Main from './Components/Pages/Main';
import UserDashbord from './Components/Pages/UserDashbord';
import { Provider } from 'react-redux';
import setAutToken from './Utils/setAutToken';
import store from './store';
import { loadUser } from './action/auth';

import './App.css';
import auth from './reducers/auth';

if (localStorage.token) {
  setAutToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const userOrNot = () => {
    const tempState = store.getState();

    const isConnect = tempState.auth.isFullAut;
    const isLoading = tempState.auth.loading;
    console.log('AUT: ' + isConnect + 'load:' + isLoading);
    console.log(isConnect && !isLoading);

    if (isConnect && !isLoading) {
      return <UserDashbord />;
    }
    return <Main />;
  };
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
            <Switch>
              <Route exact path='/' component={() => userOrNot()}></Route>
              <Route exact path='/Login' component={Login}></Route>
              {/* <Route exact path='/dashboard' component={UserDashbord}></Route> */}
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
};
export default App;
