import React from "react";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") == null) {
    return <Navigate to={"/signIn"} />;
  } else {
    return props.children;
  }
}
