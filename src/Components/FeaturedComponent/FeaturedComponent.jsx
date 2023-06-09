import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function FeaturedComponent() {
  let [isLoading, setIsLoading] = useState(false);
  let [iconLoading, setIconLoading] = useState(false);

  const [products, setProducts] = useState([]);
  let { addToCart } = useContext(cartContext);

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

  async function getFeaturedProducts() {
    setIsLoading(true);
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-2" key={product._id}>
              <div className="product overflow-hidden px-2 py-3">
                <Link to={`/productDetails/${product._id}`}>
                  <img src={product.imageCover} className="w-100" alt="" />
                  <span className="text-main fw-bold font-sm">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">{product.price} EGB</span>
                    <span>
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product._id)}
                  className="btn bg-main text-white w-100"
                >
                  {iconLoading ? (
                    <i className="fa fa-spin fa-spinner text-white"></i>
                  ) : (
                    "+ Add"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
