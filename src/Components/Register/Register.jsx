import React, { useState } from "react";
// import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name MinLength is 3")
      .max(10, "name MaxLength is 10"),
    email: Yup.string().required("email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,20}$/,
        "Password Must start with capital letter, Passowrd minimum length 5 Character, Passowrd Maximum length 20 Character"
      ),
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Passowrd and rePassword are not matched"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Write invalid Egyptian number"),
  });

  async function handleRegister(values) {
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg(`${err.response.data.message}`);
        console.log(err.response.data.message);
      });
    if (data.message === "success") {
      setIsLoading(false);
      navigate("/signIn");
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="w-75 mx-auto form-group mb-5">
        <h3>Register Now</h3>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            className="form-control mb-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name && (
            <div className="alert alert-danger">{formik.errors.name}</div>
          )}

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

          <label htmlFor="rePassword">rePassword:</label>
          <input
            className="form-control mb-2"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          )}

          <label htmlFor="phone">Phone:</label>
          <input
            className="form-control mb-2"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
