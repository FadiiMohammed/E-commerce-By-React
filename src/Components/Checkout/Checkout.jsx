import React, { useContext, useState } from "react";
import { formik, useFormik } from "formik";
import { cartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Checkout() {
  let { onlinePayment } = useContext(cartContext);
  let [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values) {
    setIsLoading(true);
    let response = await onlinePayment("64837006efd5010d1c47e6ed", values);
    window.location.href = response.data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CheckOut</title>
      </Helmet>
      <form className="w-50 mx-auto py-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details:</label>
        <input
          className="form-control mb-3"
          type="text"
          name="details"
          id="details"
          onChange={formik.handleChange}
          value={formik.values.details}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          className="form-control mb-3"
          type="tel"
          name="phone"
          id="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />

        <label htmlFor="city">City:</label>
        <input
          className="form-control mb-3"
          type="text"
          name="city"
          id="city"
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        <button type="submit" className="w-100 btn btn-success bg-main">
          {isLoading ? <i className="fas fa-spin fa-spinner"></i> : null} Pay
        </button>
      </form>
    </>
  );
}
