import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../Loader/Loader";

export default function CategorySlider() {
  const [categories, setCategories] = useState();
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <>
      <h2>Shop Popular Categories:</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <Slider className="mb-5" {...settings}>
          {categories?.map((category) => (
            <div key={category._id}>
              <img height="200" src={category.image} className="w-100" alt="" />
              <h2 className="h6 pt-2">{category.name}</h2>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
