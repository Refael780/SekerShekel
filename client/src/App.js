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
import ProfileForm from './Components/Pages/profile-form/ProfileForm';
import FillSurvey from './Components/Pages/Survey/FillSurvey';
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
    console.log(!isConnect && !isLoading);

    if (!isConnect && !isLoading) {
      return <Login />;
    } else return <UserDashbord />;
  };
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className='container'>
            <Switch>
              <Route exact path='/' component={Main}></Route>
              <Route
                exact
                path='/Dashbord'
                component={() => userOrNot()}
              ></Route>
              <Route exact path='/Login' component={Login}></Route>

              <Route exact path='/Create' component={ProfileForm}></Route>
              {/* <Route exact path='/dashboard' component={UserDashbord}></Route> */}
              <Route
                exact
                path='/PasswordPage/:token'
                component={PasswordPage}
              ></Route>
              <Route exect path='/FillSurvey' component={FillSurvey}></Route>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
