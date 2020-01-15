import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { regS } from '../../action/auth';
import { setModal } from '../../action/modal';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import '../../App.css';
export class PassworPage extends Component {
  state = {
    password: '',
    confirmPassword: '',
    redirect: false
  };

  render() {
    const { password, confirmPassword } = this.state;

    const onPasswordChange = e => {
      this.setState({ password: e.target.value });
    };
    const onConfirmPasswordChange = e => {
      this.setState({ confirmPassword: e.target.value });
    };
    const passwordHandler = e => {
      e.preventDefault();
      if (password !== confirmPassword) {
        console.log('not match');

        ///ToDO Alert
      } else {
        console.log(this.props.match.params.token);
        this.props.regS(this.props.match.params.token, password);
        ///Todo Alert if the password is iligal
        this.props.setModal('ברכות על סיום ההרשמה');
        this.setState({ redirect: true });
      }
    };
    return this.state.redirect ? (
      <Redirect to='/' />
    ) : (
      <div>
        <Container>
          <section dir='rtl' className='container'>
            <h1 className='large text-primary  text-center'>סיום הרשמה</h1>
            <p className='lead text-center' dir='rtl'>
              <i className='fas fa-user'></i> בחר סיסמא בעלת 6 תווים או יותר
            </p>
            <form dir='rtl' className='form' action='dashboard.html'>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Email Address'
                  name='password'
                  onChange={e => onPasswordChange(e)}
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  placeholder='Password'
                  name='confirmPassword'
                  onChange={e => onConfirmPasswordChange(e)}
                />
              </div>
              <input
                type='submit'
                onClick={e => passwordHandler(e)}
                className='btn btn-primary'
                value='Login'
              />
            </form>
            <p className='my-1'>
              Don't have an account? <a href='register.html'>Sign Up</a>
            </p>
          </section>
        </Container>
      </div>
    );
  }
}

export default connect(null, { regS, setModal })(PassworPage);
