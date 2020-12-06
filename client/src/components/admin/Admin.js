import React from "react";

import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
const Admin = () => {
  return (
    <div className='container-admin'>
      <SideBar />
      <NavBar />
      <Dashboard />
    </div>
  );
};

export default Admin;
