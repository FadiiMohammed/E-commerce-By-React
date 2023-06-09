import React, { useState } from "react";
// import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SignIn(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,20}$/,
        "Password Must start with capital letter, Passowrd minimum length 5 Character, Passowrd Maximum length 20 Character"
      ),
  });

  async function handleLogin(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg(`${err.response.data.message}`);
        console.log(err.response.data.message);
      });
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      props.saveUserData();
      setIsLoading(false);
      navigate("/");
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign in</title>
      </Helmet>
      <div className="w-75 mx-auto form-group">
        <h3>Login Now</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            className="form-control mb-2"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert alert-danger">{formik.errors.email}</div>
          )}

          <label htmlFor="password">Password:</label>
          <input
            className="form-control mb-2"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert alert-danger">{formik.errors.password}</div>
          )}

          {isLoading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
