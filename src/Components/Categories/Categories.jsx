import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  async function getCategories() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {categories.map((category) => (
            <div key={category._id} className="col-md-3 p-2">
              <img src={category.image} height="250" className="w-100" alt="" />
              <h3>{category.name}</h3>
              <p>{category.slug}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
