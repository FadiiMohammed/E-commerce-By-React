import "./App.css";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import LogOut from "./Components/LogOut/LogOut";
import SignIn from "./Components/SignIn/SignIn";
import NotFound from "./Components/NotFound/NotFound";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { CounterContextProdvider } from "./Context/CounterContext";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import AllOrders from "./Components/AllOrders/AllOrders";

function App() {
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  let [userData, setUserData] = useState(null);
  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "signIn", element: <SignIn saveUserData={saveUserData} /> },
        { path: "logout", element: <LogOut /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <CounterContextProdvider>
        <Toaster />
        <RouterProvider router={routers}> </RouterProvider>;
      </CounterContextProdvider>
    </CartContextProvider>
  );
}

export default App;
