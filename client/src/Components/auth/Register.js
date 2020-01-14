import React, { Fragment } from 'react';
import { FormGroup, Container, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import { setModal } from '../../action/modal';

import '../../App.css';

const Register = props => {
  const RegisterHandler = e => {
    e.preventDefault();
    ///if some of the input is wrong we alert to user
    ///TO-DO

    props.setAlert('confirm', 'danger'); ///To do the spesidic alert

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
            <i className='fas fa-user'></i> צור את השתמש שלך
          </p>
          <Form dir='rtl' action='create-profile.html'>
            <FormGroup>
              <input type='text' placeholder='שם' name='name' required />
            </FormGroup>
            <FormGroup>
              <input type='מייל' placeholder='כתובת מייל @' name='email' />
            </FormGroup>
            <FormGroup>
              <input
                type='text'
                placeholder='טלפון'
                name='phone'
                minLength='6'
              />
            </FormGroup>
            <FormGroup>
              <input
                type='text'
                placeholder='כתובת'
                name='adress'
                minLength='6'
              />
            </FormGroup>
            <input
              onClick={e => RegisterHandler(e)}
              type='button'
              className='btn btn-primary'
              value='הרשם'
            />

            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </Form>
          <p className='my-1'>
            כבר רשום? <a href='login.html'>התחבר</a>
          </p>
        </section>
      </Container>
    </Fragment>
  );
};

export default connect(null, { setAlert, setModal })(Register);
