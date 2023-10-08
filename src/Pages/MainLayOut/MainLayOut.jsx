import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { userContext } from "../../Context/UserContext";

function MainLayOut() {
  let { setUserToken } = useContext(userContext);
  if (localStorage.getItem("userToken")) {
    setUserToken(localStorage.getItem("userToken"));
  }

  return (
    <>
      <div className="container">
        <Navbar />
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default MainLayOut;
