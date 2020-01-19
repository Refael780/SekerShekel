import React, { Fragment, useState } from 'react';
import { FormGroup, Container, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import { setModal } from '../../action/modal';
import { regM } from '../../action/auth';
import '../../App.css';

const Register = props => {
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

    props.setAlert('confirm', 'danger'); ///To do the spesidic alert

    try {
      const tempPass = '1234';
      console.log('before regM');
      props.regM({ name, email, tempPass, adress, phonNumber });
    } catch (error) {
      console.log(error);
    }

    ///if user already exist
    ///TO-DO

    props.setModal(
      'להשלמת התהליך,מייל ישלח בדקות הקרובות אנא לחץ על הלינק והזן סיסמא',
      'as'
    );
  };

  return (
    <Fragment>
      <Container fluid>
        <section className='container'>
          <h1 className='large text-primary'>רישום</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> צור את המשתמש שלך
          </p>
          <Form dir='rtl'>
            <FormGroup>
              <input
                type='text'
                placeholder='שם'
                name='name'
                required
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <input
                type='מייל'
                placeholder='כתובת מייל @'
                name='email'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <input
                type='text'
                placeholder='טלפון'
                name='phonNumber'
                minLength='6'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <input
                type='text'
                placeholder='כתובת'
                name='adress'
                minLength='6'
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <input
              onClick={e => RegisterHandler(e)}
              type='submit'
              className='btn btn-primary'
              value='הרשם'
            />

            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </Form>
          <p className='my-1'>
            כבר רשום ? <a href='login.html'>התחבר</a>
          </p>
        </section>
      </Container>
    </Fragment>
  );
};

export default connect(null, { regM, setAlert, setModal })(Register);
