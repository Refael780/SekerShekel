import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar bg-dark'>
        <h1>
          <a href='index.html'>
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
};

export default Navbar;
