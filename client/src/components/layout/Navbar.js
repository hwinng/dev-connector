import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, user, loading } }) => {
  // get auth link, guest link, admin link

  const authLinks = (
    <ul>
      {isAuthenticated && user.role === "admin" && (
        <li>
          <Link to='/admins'>
            <i className='fas fa-user-shield' />{" "}
            <span className='hide-sm'>Admin</span>
          </Link>
        </li>
      )}
      <li>
        <Link to='/events'>
          <i className='far fa-calendar-alt' />{" "}
          <span className='hide-sm'>Event</span>
        </Link>
      </li>
      <li>
        <Link to='/jobs'>
          <i className='far fa-list-alt' />{" "}
          <span className='hide-sm'>Job Board</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fab fa-connectdevelop' />{" "}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='far fa-address-book' />{" "}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/jobs'>
          <i className='far fa-list-alt' />{" "}
          <span className='hide-sm'>Job Board</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i className='fab fa-connectdevelop' />{" "}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
