import React, { useState } from 'react';
import { loginUser } from '../../action/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './css/style.css';

const CustomLogin = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const loginHandler = async e => {
    e.preventDefault();
    ///if some of the input is wrong we alert to user
    ///TO-DO
    props.loginUser(email, password);
  };

  if (props.isAuth) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <section dir='rtl' className='sign-in'>
        <div className='container'>
          <div className='signin-content'>
            <div className='signin-image'>
              <figure>
                <img
                  src={require('./images/signin-image.jpg')}
                  alt='sing up image'
                />
              </figure>
              <a href='#' className='signup-image-link'>
                Create an account
              </a>
            </div>

            <div className='signin-form'>
              <h2 className='form-title'>התחבר למערכת</h2>
              <form className='register-form' id='login-form'>
                <div className='form-group'>
                  <label>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input
                    type='email'
                    placeholder='כתובת מייל'
                    name='email'
                    //onChange={e => onPasswordChange(e)}
                    required
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <label>
                    <i className='zmdi zmdi-lock'></i>
                  </label>
                  <input
                    type='password'
                    placeholder='סיסמא'
                    name='password'
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='checkbox'
                    name='remember-me'
                    id='remember-me'
                    className='agree-term'
                  />
                  <label className='label-agree-term'>
                    <span>
                      <span></span>
                    </span>
                    Remember me
                  </label>
                </div>
                <div className='form-group form-button'>
                  <input
                    value='התחברות'
                    onClick={e => loginHandler(e)}
                    type='submit'
                    id='signin'
                    className='form-submit'
                  />
                </div>
              </form>
              <div className='social-login'>
                <span className='social-label'>Or login with</span>
                <ul className='socials'>
                  <li>
                    <a href='#'>
                      <i className='display-flex-center zmdi zmdi-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='display-flex-center zmdi zmdi-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='display-flex-center zmdi zmdi-google'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuth: state.auth.isFullAut,
  loading: state.auth.loading
});
export default connect(mapStateToProps, { loginUser })(CustomLogin);
