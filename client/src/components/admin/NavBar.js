import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top fix-navbar '>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            aria-controls='navigation-index'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='navbar-toggler-icon icon-bar'></span>
            <span className='navbar-toggler-icon icon-bar'></span>
            <span className='navbar-toggler-icon icon-bar'></span>
          </button>
          <div className='collapse navbar-collapse justify-content-end'>
            <form className='navbar-form'>
              <div className='input-group no-border'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Search...'
                />
                <button
                  type='submit'
                  className='btn btn-white btn-round btn-just-icon'
                >
                  <i className='fas fa-search'></i>
                  <div className='ripple-container'></div>
                </button>
              </div>
            </form>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' href='#'>
                  <i class='fas fa-home fa-2x'></i>
                  <p className='d-lg-none d-md-block'>Stats</p>
                </Link>
              </li>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link'
                  href='http://example.com'
                  id='navbarDropdownMenuLink'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <i class='fas fa-bell fa-2x'></i>
                  <span className='notification'>5</span>
                  <p className='d-lg-none d-md-block'>Some Actions</p>
                </Link>
                <div
                  className='dropdown-menu dropdown-menu-right'
                  aria-labelledby='navbarDropdownMenuLink'
                >
                  <Link className='dropdown-item' href='#'>
                    Mike John responded to your email
                  </Link>
                  <Link className='dropdown-item' href='#'>
                    You have 5 new tasks
                  </Link>
                  <Link className='dropdown-item' href='#'>
                    You're now friend with Andrew
                  </Link>
                  <Link className='dropdown-item' href='#'>
                    Another Notification
                  </Link>
                  <Link className='dropdown-item' href='#'>
                    Another One
                  </Link>
                </div>
              </li>
              <li className='nav-item dropdown'>
                <Link
                  className='nav-link'
                  href='#'
                  id='navbarDropdownProfile'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <i class='fas fa-user-circle fa-2x'></i>
                  <p className='d-lg-none d-md-block'>Account</p>
                </Link>
                <div
                  className='dropdown-menu dropdown-menu-right'
                  aria-labelledby='navbarDropdownProfile'
                >
                  <Link className='dropdown-item' href='#'>
                    Profile
                  </Link>
                  <Link className='dropdown-item' href='#'>
                    Settings
                  </Link>
                  <div className='dropdown-divider'></div>
                  <Link className='dropdown-item' href='#'>
                    Log out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};
export default NavBar;
