import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utilities/setAuthToken";
import { loadUser } from "./actions/auth";

import NavBar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); //[] to make sure that load user run once

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/user/:id' component={Profile} />
              <ProtectRoute exact path='/dashboard' component={Dashboard} />
              <ProtectRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <ProtectRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <ProtectRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <ProtectRoute
                exact
                path='/add-education'
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
