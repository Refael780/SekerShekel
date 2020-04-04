import React, { useState, Fragment } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import { setModal } from '../../action/modal';
import { regM } from '../../action/auth';
import Alert from '../UI/Alert';
import './css/style.css';

const RegisterCustom = props => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adress: '',
    phonNumber: ''
  });

  const { name, email, adress, phonNumber } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const RegisterHandler = async e => {
    e.preventDefault();
    ///if some of the input is wrong we alert to user
    ///TO-DO

    //props.setAlert('confirm', 'danger'); ///To do the spesidic alert

    try {
      const tempPass = '1234';
      console.log('before regM');
      props.regM({ name, email, tempPass, adress, phonNumber });

      props.setModal(
        'להשלמת התהליך,מייל ישלח בדקות הקרובות אנא לחץ על הלינק והזן סיסמא',
        'as'
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div
        dir='rtl'
        style={{ margin: ' 0.5rem 1rem 1rem 0' }}
        className='container'
      >
        <div className='signup-content'>
          <div className='signup-form'>
            <h2
              style={{
                fontFamily: 'Amatic SC ,cursive',
                textAlign: 'center',
                fontSize: '5rem'
              }}
              className='form-title'
            >
              הירשם
            </h2>
            <form className='register-form' id='register-form'>
              <div className='form-group'>
                <label for='name'>
                  <i className='zmdi zmdi-account material-icons-name'></i>
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='שם מלא'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label for='email'>
                  <i className='zmdi zmdi-email'></i>
                </label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='אמייל'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label for='pass'>
                  <i className='zmdi zmdi-lock'></i>
                </label>
                <input
                  type='text'
                  id='pass'
                  name='phonNumber'
                  minLength='6'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <label for='re-pass'>
                  <i className='zmdi zmdi-lock-outline'></i>
                </label>
                <input
                  type='text'
                  id='re_pass'
                  placeholder='כתובת'
                  name='adress'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='checkbox'
                  name='agree-term'
                  id='agree-term'
                  className='agree-term'
                />
                <label for='agree-term' className='label-agree-term'>
                  <span>
                    <span></span>
                  </span>
                  I agree all statements in{' '}
                  <a href='#' className='term-service'>
                    Terms of service
                  </a>
                </label>
              </div>
              <div className='form-group form-button'>
                <input
                  outline
                  onClick={e => RegisterHandler(e)}
                  type='submit'
                  value='הרשם'
                  id='signup'
                  className='form-submit'
                />
              </div>
            </form>
            <Alert />
          </div>
          <div className='signup-image'>
            <figure>
              <img
                src={require('./images/signup-image.jpg')}
                alt='sign up image'
              />
            </figure>
            <a href='#' className='signup-image-link'>
              כבר רשום
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default connect(null, { regM, setAlert, setModal })(RegisterCustom);
