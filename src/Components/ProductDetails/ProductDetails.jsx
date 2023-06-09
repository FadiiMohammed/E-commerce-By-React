import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductDetails() {
  let [productDetails, setProductDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [iconLoading, setIconLoading] = useState(false);

  let { addToCart } = useContext(cartContext);

  let params = useParams();

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${params.id}`
    );
    setProductDetails(data.data);
    setIsLoading(false);
  }

  async function addProductToCart(productID) {
    setIconLoading(true);
    let response = await addToCart(productID);
    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    setIconLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row py-5 position-relative">
        {isLoading ? (
          <div className="spin">
            <i className="fas fa-spinner fa-spin fs-2 text-main"></i>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {productDetails?.images.map((img) => (
                  <img className="w-100" src={img} alt="" />
                ))}
              </Slider>
            </div>
            <div className="p-5 col-md-8">
              <h3>{productDetails?.title}</h3>
              <span className="text-main fw-bold font-sm mb-5">
                {productDetails?.category.name}
              </span>
              <p className="text-muted">{productDetails?.description}</p>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">{productDetails?.price} EGB</span>
                <span>
                  <i className="fas fa-star rating-color"></i>
                  {productDetails?.ratingsAverage}
                </span>
              </div>
              <button
                onClick={() => addProductToCart(params.id)}
                className="btn bg-main text-white w-100"
              >
                {iconLoading ? (
                  <i className="fas fa-spin fa-spinner text-white"></i>
                ) : (
                  "+ Add"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
