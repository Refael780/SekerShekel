import React from 'react';

import './Login.css';
import '../../App.css';
import CustomLogin from '.././RegisterCustom/CustomLogin';

const Login = props => {
  return (
    <CustomLogin></CustomLogin>
    // {/* <Container fluid> <div dir='rtl' className='cont'>
    //   <Row>
    //     <Col md='12'>
    //       <div className='loginBox'>
    //         <section dir='rtl'>
    //           <Col md='12'>
    //             <h1 className='  text-center'>התחברות</h1>
    //             <br />
    //             <hr />
    //             <p
    //               style={{ float: 'right' }}
    //               className='lead text-center'
    //               dir='rtl'
    //             >
    //               <i className='fas fa-user'> </i> על מנת להתחבר הזן כתובת
    //               מייל וסיסמא
    //             </p>
    //             <Form dir='rtl' action='dashboard.html'>
    //               <FormGroup>
    //                 <br />
    //                 <br />
    //                 <br />
    //                 <Label style={{ float: 'right' }} dir='rtl' dir='rtl'>
    //                   כתובת מייל
    //                 </Label>
    //                 <Input
    //                   bsSize='lg'
    //                   type='email'
    //                   placeholder='כתובת מייל'
    //                   name='email'
    //                   //onChange={e => onPasswordChange(e)}
    //                   required
    //                   onChange={e => onChange(e)}
    //                 />
    //               </FormGroup>
    //               <FormGroup>
    //                 <Label style={{ float: 'right' }}>סיסמא</Label>
    //                 <Input
    //                   bsSize='lg'
    //                   type='password'
    //                   placeholder='סיסמא'
    //                   name='password'
    //                   onChange={e => onChange(e)}
    //                 />
    //               </FormGroup>
    //               <Input
    //                 bsSize='lg'
    //                 type='submit'
    //                 //onClick={e => passwordHandler(e)}
    //                 className='btn btn-primary'
    //                 value='התחברות'
    //                 onClick={e => loginHandler(e)}
    //               />
    //             </Form>
    //             <p style={{ float: 'right' }} className='my-1'>
    //               אין לך משתמש? <a href='/'>רישום</a>
    //             </p>
    //           </Col>
    //         </section>
    //       </div>
    //     </Col>
    //   </Row>
    // </div> </Container> */}
  );
};

// const mapStateToProps = state => ({
//   isAuth: state.auth.isFullAut,
//   loading: state.auth.loading
// });

export default Login;
