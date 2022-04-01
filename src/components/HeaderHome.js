import React from 'react';
import { NavLink } from 'react-router-dom';
import { TeamOutlined } from '@ant-design/icons';

export default function HeaderHome() {
  return (
    <nav className='navbar navbar-expand-sm navbar-light bg-light border mt-2 container'>
      <div className='col-6'>
        <NavLink exact className='navbar-brand' to='/home'>
          <span className=' display-5'>
            <TeamOutlined />
          </span>
          <span className='ml-3'>Employee Manager</span>
        </NavLink>
      </div>
      <div
        className='collapse navbar-collapse col-6 justify-content-end'
        id='collapsibleNavId'
      >
        <ul className='navbar-nav mt-2 mt-lg-0 '>
          <li className='nav-item active'>
            <NavLink
              exact
              className='nav-link btn btn-primary text-white mr-3'
              to='/employee'
            >
              Employee
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink
              exact
              className='nav-link btn btn-primary text-white'
              to='/team'
            >
              Team
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
