import React from "react";
// import paypal from "../../assets/paypal.svg";
// import mastercard from "../../assets/mastercard.svg";
// import googlePlay from "../../assets/googlePlay.svg";
// import appStore from "../../assets/app_store.svg";

export default function Footer() {
  return (
    <>
      <div className="bg-main-light py-5">
        <div className="container bg-main-light">
          <h2>Get the fresh cart App</h2>
          <p className="text-muted">
            We will send you a link, Open it on your Phone to download the app
          </p>
          <div className="d-flex justify-content-start mx-2 py-3 border-bottom">
            <input
              type="email"
              id="email"
              className="form-control me-3 w-75"
              placeholder="Email.."
            />
            <button className="btn bg-main text-white">Share App Link</button>
          </div>
          <div className="d-flex justify-content-between py-3 border-bottom">
            <div className="d-flex align-items-center">
              <h5 className="me-3">Payment Partners</h5>
              <div>
                {/* <img src={paypal} className="creditImg me-2" alt="" /> */}
                {/* <img src={mastercard} className="creditImg" alt="" /> */}
              </div>
            </div>
            <div className="d-flex align-items-center">
              <h5 className="me-3">Get deliveries with FreshCart</h5>
              <div>
                {/* <img src={appStore} className="storeImg me-2" alt="" /> */}
                {/* <img src={googlePlay} className="storeImg" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
