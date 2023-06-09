import React from "react";
// import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ userData, setUserData }) {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/signIn");
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-between vh-100 ">
        <Navbar logOut={logOut} userData={userData} />

        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
