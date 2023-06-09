import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();
export function CartContextProvider(props) {
  let header = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(ID) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: ID,
        },
        {
          headers: header,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: header,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function removeCartItem(productID) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, {
        headers: header,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function updateCartItem(productID, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
        {
          count: count,
        },
        {
          headers: header,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: header,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: header,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateCartItem,
        clearCart,
        onlinePayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
