import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/auth';
import { Redirect } from 'react-router-dom';

const Navbar = prop => {
  let user = '';
  if (prop.isAut) {
    console.log(prop.loading);

    user = prop.aut.user;
    console.log(user);
    try {
      console.log(user.name);
      const User = {
        ...user
      };
      console.log(User);
      console.log(User.name);
    } catch (error) {}
  }
  const logOut = e => {
    try {
      prop.logout();
      return <Redirect to='/' />;
    } catch (error) {
      console.log(error);
    }
  };
  const nevAll = (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <a href='/'>
            <i className='fas fa-code'></i> סקר שקל
          </a>
        </h1>
        <ul>
          <li>
            <a href='#3'>Developers</a>
          </li>
          <li>
            <Link to='/register'>רישום</Link>
          </li>
          <li>
            <Link to='/login'>התחברות</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
  const nevUser = (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <Link to='/'>
            סקר שקל <i className='fa fas fa-money'></i>
          </Link>
        </h1>
        <ul>
          <li>
            <a href='#3'>Developers</a>
          </li>
          <li>
            <Link to='/register'>סקרים שמלאתי</Link>
          </li>
          <li>
            <Link to='/register'> הזמן סקר</Link>
          </li>
          <li>
            <Link onClick={e => logOut(e)}>התנתקות</Link>
          </li>
          <li>
            <a href='/'>{user.name !== null ? user.name : ''}</a>
          </li>
        </ul>
      </nav>
    </div>
  );

  return !prop.loading && <Fragment>{prop.isAut ? nevUser : nevAll}</Fragment>;
};

const mapStateToProps = state => ({
  isAut: state.auth.isFullAut,
  aut: state.auth,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(Navbar);
