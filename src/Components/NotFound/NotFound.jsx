import React from "react";
import styles from "./NotFound.module.css";
import notfound from "../../assets/error.svg";

export default function NotFound() {
  return (
    <>
      <div className="container d-flex align-items-center justify-content-center">
        <img className="w-50" src={notfound} alt="" />{" "}
      </div>
    </>
  );
}
