import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../RegisterCustom/css/style.css';
import { Container, Row, Col } from 'reactstrap';
import '../../../Components/Pages/Main.css';
export class OrderSurvey extends Component {
  render() {
    const onChange = e => {};
    const loginHandler = async e => {
      e.preventDefault();
      ///if some of the input is wrong we alert to user
      ///TO-DO
    };
    return (
      <div dir='rtl'>
        <section className='sign-in'>
          <div className='container'>
            <div className='signin-content'>
              <Container>
                <Row>
                  <Col>
                    <div style={{ margin: 'auto' }} className='signin-image'>
                      <figure style={{ margin: '1em 10px' }}>
                        <img
                          style={{ boxShadow: '2px 7px 11px 3px #bfb7b7' }}
                          src={require('../../RegisterCustom/images/d.jpg')}
                          alt='sing up image'
                        />
                      </figure>
                    </div>
                    <br />
                    <div
                      style={{
                        boxShadow: ' 0px 2px 4px 2px rgba(0, 0, 0, 0.26)'
                      }}
                      className='borderSwitchPicture'
                    >
                      <p
                        style={{
                          fontSize: '2rem',
                          fontFamily: 'Amatic SC ,cursive',
                          textAlign: 'center',
                          color: 'black'
                        }}
                      >
                        {' '}
                        ש המון גרסאות זמינות לפסקאות של Lorem Ipsum. אבל רובם
                        עברו שינויים בצורה זו או אחרת, על ידי השתלת הומור או
                        מילים אקראיות שלא נראות אפילו מעט אמינות. אם אתה הולך
                        להשתמש במקטעים של של ינויים בצורה זו או אחרת,{' '}
                      </p>
                    </div>
                  </Col>
                  <Col>
                    <div className='signin-form'>
                      <div className='form-title'>
                        <p
                          style={{
                            fontSize: '4rem',
                            fontFamily: 'Amatic SC ,cursive',
                            textAlign: 'center',
                            color: 'black'
                          }}
                        >
                          הזמן סקר
                        </p>
                      </div>
                      <form className='register-form' id='login-form'>
                        <div className='form-group'>
                          <label>
                            <i className='zmdi zmdi-account material-icons-name'></i>
                          </label>
                          <input
                            style={{ textAlign: 'center' }}
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
                            style={{ textAlign: 'center' }}
                            type='text'
                            placeholder='שם חברה'
                            name='companyName'
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className='form-group'>
                          <label>
                            <i className='zmdi zmdi-lock'></i>
                          </label>
                          <input
                            style={{ textAlign: 'center' }}
                            type='number'
                            placeholder='טלפון'
                            name='phonNumber'
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className='form-group'>
                          <label>
                            <i className='zmdi zmdi-lock'></i>
                          </label>
                          <input
                            style={{ textAlign: 'center' }}
                            type='email'
                            placeholder='אימייל'
                            name='email'
                            onChange={e => onChange(e)}
                          />
                        </div>

                        <div
                          style={{ alignItems: 'right' }}
                          className='form-group form-button'
                        >
                          <input
                            value='חזרו אליי'
                            onClick={e => loginHandler(e)}
                            type='submit'
                            id='signin'
                            className='form-submit'
                          />
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
                <br />
                <hr />
                <Row>
                  <Col
                    style={{
                      boxShadow: ' 0px 2px 4px 2px rgba(0, 0, 0, 0.26)'
                    }}
                    className='borderSwitchPicture'
                  >
                    <p
                      style={{
                        fontSize: '1.6rem',

                        textAlign: 'center',
                        color: 'black'
                      }}
                    >
                      ת, על ידי השתלת הומור או מילים אקראיות שלא נראות אפילו מעט
                      אמינות. אם אתה הולך להשתמש במקטעים של של ינויים בצורה זו
                      ת, על ידי השתלת הומור או מילים אקראיות שלא נראות אפילו מעט
                      אמינות. אם אתה הולך להשתמש במקטעים של של ינויים בצורה זו
                      ת, על ידי השתלת הומור או מילים אקראיות שלא נראות אפילו מעט
                      אמינות. אם אתה הולך להשתמש במקטעים של של ינויים בצורה זו
                      מלל תנאי הצטרפות וכו ל
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSurvey);
