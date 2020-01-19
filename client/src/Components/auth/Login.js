import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';
import './Login.css';
import '../../App.css';
const Login = () => {
  return (
    <Container fluid>
      <div dir='rtl' className='cont'>
        <Row>
          <Col md='12'>
            <div className='loginBox'>
              <section dir='rtl'>
                <Col md='12'>
                  <h1 className='large text-primary  text-center'>התחברות</h1>
                  <p
                    style={{ float: 'right' }}
                    className='lead text-center'
                    dir='rtl'
                  >
                    <i className='fas fa-user'> </i> על מנת להתחבר הזן כתובת
                    מייל וסיסמא
                  </p>
                  <Form dir='rtl' action='dashboard.html'>
                    <FormGroup>
                      <br />
                      <br />
                      <br />
                      <Label style={{ float: 'right' }} dir='rtl' dir='rtl'>
                        כתובת מייל
                      </Label>
                      <Input
                        bsSize='lg'
                        type='password'
                        placeholder='כתובת מייל'
                        name='password'
                        //onChange={e => onPasswordChange(e)}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>סיסמא</Label>
                      <Input
                        bsSize='lg'
                        type='password'
                        placeholder='סיסמא'
                        name='confirmPassword'
                        //  onChange={e => onConfirmPasswordChange(e)}
                      />
                    </FormGroup>
                    <Input
                      bsSize='lg'
                      type='submit'
                      //onClick={e => passwordHandler(e)}
                      className='btn btn-primary'
                      value='התחברות'
                    />
                  </Form>
                  <p style={{ float: 'right' }} className='my-1'>
                    אין לך משתמש? <a href='register.html'>רישום</a>
                  </p>
                </Col>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
