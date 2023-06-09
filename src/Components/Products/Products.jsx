import React from "react";
import FeaturedComponent from "../FeaturedComponent/FeaturedComponent";
import { Helmet } from "react-helmet";

export default function Products() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <FeaturedComponent />
    </>
  );
}
