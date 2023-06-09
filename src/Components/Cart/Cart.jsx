import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateCartItem, clearCart } =
    useContext(cartContext);
  let [isLoading, setIsLoading] = useState(false);

  let [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    setIsLoading(true);
    let response = await getLoggedUserCart();
    console.log(response.data);
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
    }
    setIsLoading(false);
  }
  async function deleteItem(id) {
    let response = await removeCartItem(id);
    toast.success("Product removed from your Cart", {
      style: { fontWeight: "bold" },
    });
    setCartDetails(response.data.data);
  }
  async function updateProductCount(id, count) {
    let response = await updateCartItem(id, count);
    toast.success("Product updated", {
      style: { fontWeight: "bold" },
    });
    setCartDetails(response.data.data);
  }

  async function clearCartItems() {
    let res = await clearCart();
    console.log(res);
    toast.success(res.data.message);
    setCartDetails(null);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      <div className="position-relative"></div>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {cartDetails !== null ? (
            <div className="bg-main-light p-4 my-4">
              <h3>Shop Cart:</h3>
              <h6 className="text-main">
                Total cart Price: {cartDetails.totalCartPrice}
              </h6>
              <div className="d-flex justify-content-between">
                <button onClick={clearCartItems} className="btn btn-danger">
                  Clear Cart
                </button>
                <button className="btn btn-success ">
                  <Link className="text-white" to="/checkout">
                    Pay
                  </Link>
                </button>
              </div>
              {cartDetails.products.map((product) => (
                <div
                  key={product.product._id}
                  className="row align-items-center border-bottom py-2"
                >
                  <div className="col-md-1">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                  </div>
                  <div className="col-md-11 d-flex justify-content-between">
                    <div>
                      <h6>{product.product.title}</h6>
                      <h6 className="text-main">Price: {product.price} </h6>

                      <button
                        onClick={() => deleteItem(product.product._id)}
                        className="btn p-0 m-0 text-danger"
                      >
                        <i className="fa-regular  fa-trash-can me-1"></i>
                        Remove
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count + 1
                          )
                        }
                        className="button btn-sm btn border-main fw-bold"
                      >
                        +
                      </button>
                      <span className="mx-2 fw-bold">{product.count}</span>
                      <button
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count - 1
                          )
                        }
                        className="button btn-sm btn border-main fw-bold"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="text-center text-danger">Your Cart is empty</h2>
          )}
        </div>
      )}
    </>
  );
}
