import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <Fragment>
      <div
        className='sidebar'
        data-color='purple'
        data-background-color='white'
        data-image='../assets/img/sidebar-1.jpg'
      >
        <div className='logo'>
          <Link
            href='http://www.creative-tim.com'
            className='simple-text logo-normal'
          >
            Admin
          </Link>
        </div>
        <div className='sidebar-wrapper'>
          <ul className='nav'>
            <li className='nav-item active  '>
              <Link className='nav-link' href='./dashboard.html'>
                <i class='fas fa-home'></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./user.html'>
                <i class='fas fa-user-circle'></i>
                <p>User Profile</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./tables.html'>
                <i class='fas fa-th-list'></i>
                <p>Table List</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./typography.html'>
                <i class='fas fa-print'></i>
                <p>Typography</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./icons.html'>
                <i class='fas fa-atom'></i>
                <p>Icons</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./map.html'>
                <i class='fas fa-map-marked'></i>
                <p>Maps</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./notifications.html'>
                <i class='fas fa-bell'></i>
                <p>Notifications</p>
              </Link>
            </li>
            <li className='nav-item '>
              <Link className='nav-link' href='./rtl.html'>
                <i class='fas fa-globe'></i>
                <p>RTL Support</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default SideBar;
