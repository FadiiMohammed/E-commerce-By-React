import React, { useState } from "react";
import FeaturedComponent from "../FeaturedComponent/FeaturedComponent";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>

      <MainSlider />
      <CategorySlider />
      <FeaturedComponent />
    </>
  );
}
