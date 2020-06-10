import React, { useState, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../action/auth';
import { Redirect } from 'react-router-dom';
const Navs = prop => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
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
    } catch (error) {
      console.log('Is hereS');

      prop.isAut = false;
    }
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
    <Navbar color='dark' dark expand='md'>
      <NavbarBrand href='/'>
        <h1>
          <i className='fa fas fa-money'></i> סקר שקל
        </h1>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <NavLink href='#3'>Developers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to='/register'>רישום</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to='/login'>התחברות</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
  const nevUser = (
    <Navbar dir='rtl' color='dark' light expand='md'>
      <NavbarBrand href='/'>
        <h1>
          <i className='fa fas fa-money'></i> סקר שקל
        </h1>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <NavLink>
              <Link to='/register'>לא זמין סקרים שמלאתי</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to='/CreateSurvey'>צור סקר(יעבוד לפי הרשאה)</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to='/OrderSurvey'> הזמן סקר</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to='/Create'>בנה פרופיל(בבניה)</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link onClick={e => logOut(e)}>התנתקות></Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <a href='/'>
                {!user.name || user.name === null ? '' : user.name}
              </a>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );

  return !prop.loading && <Fragment>{prop.isAut ? nevUser : nevAll}</Fragment>;
};
const mapStateToProps = state => ({
  isAut: state.auth.isFullAut,
  aut: state.auth,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(Navs);
