import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  async function getBrands() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBrands(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="col-md-3 p-2 cursor-pointer border-3"
            >
              <img src={brand.image} className="w-100" alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
