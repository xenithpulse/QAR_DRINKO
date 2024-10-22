import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./component/admin/dashboard/AdminDashboard";
import DashboardHome from "./component/admin/dashboard/DashboardHome";
import LoginPage from "./component/admin/LoginPage.jsx";
import Adminmessages from "./component/admin/messages/Adminmessages.jsx";
import AddProduct from "./component/admin/products/AddProduct";
import AdminProducts from "./component/admin/products/AdminProducts";
import AllProducts from "./component/admin/products/AllProducts";
import AddUser from "./component/admin/users/AddUser.jsx";
import AdminUsers from "./component/admin/users/AdminUsers.jsx";
import AllUsers from "./component/admin/users/AllUsers.jsx";
import Home from "./component/home/Home";
import Footer from "./component/layouts/Footer/Footer.jsx";
import NavBar from "./component/layouts/NavBar";
import ProductPage from "./component/Product/ProductPage.jsx";
import { MeContextProvider } from "./context/meContext.js";
import { ProductsContextProvider } from "./context/productsContext.js";
import ProtectedRoute from "./ProtectedRoute.js";
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setsuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/products`;
      const response = await fetch(url);

      if (!response.ok) {
        setLoading(false);
        setsuccess(false);
        setError(true);
        setErrorMessage("Products fetching failed.");
      }

      const data = await response.json();
      setProducts(data.products);

      setLoading(false);
      setsuccess(true);
    } catch (error) {
      setsuccess(false);
      setError(true);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const clearErrors = () => {
    setError(false);
    setErrorMessage("");
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    fetchProducts();

    if (error) {
      clearErrors();
    }
  }, [error]);

  const [me, setMe] = useState(null);
  const [meLoading, setmeLoading] = useState(true);
  const [meerror, setmeError] = useState(false);
  const [mesuccess, setmesuccess] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const fetchMe = async () => {
    try {
      setmeLoading(true);
      const url = `/api/v1/me`;
      const response = await fetch(url);

      const data = await response.json();

      if (data.success) {
        setMe(data.admin);

        setisAuthenticated(true);
        setmesuccess(true);
      } else {
        setmeError(true);
        setmesuccess(false);
        setisAuthenticated(false);
      }
    } catch (error) {
      setmesuccess(false);

      setisAuthenticated(false);
      setmeError(true);
    } finally {
      setmeLoading(false);
    }
  };
  useEffect(() => {
    if (meerror) {
      setmeError(null);
    }

    fetchMe();
  }, [isAuthenticated]); // Empty dependency array to run only once

  return (
    <>
      <MeContextProvider
        value={{
          me: me,
          loading: meLoading,
          error: meerror,
          isAuthenticated: isAuthenticated,
          fetchMe: fetchMe,
          clearErrors: () => {
            setmeError(null);
          },
        }}
      >
        <ProductsContextProvider
          value={{
            products,
            loading,
            error,
            errorMessage,
            fetchProducts,
            clearErrors,
            success,
          }}
        >
          <div className="app p-0 m-0 max-w-screen overflow-hidden">
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route exact path="/" element={<Home loading={loading} />} />
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/product/:id" element={<ProductPage />} />

                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                      loading={meLoading}
                    >
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route exact path="" element={<DashboardHome />} />
                  <Route
                    path="products"
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        loading={meLoading}
                      >
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  >
                    <Route exact path="" element={<AllProducts />} />
                    <Route exact path="upload" element={<AddProduct />} />
                  </Route>
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        loading={meLoading}
                      >
                        <AdminUsers />
                      </ProtectedRoute>
                    }
                  >
                    <Route exact path="" element={<AllUsers />} />
                    <Route exact path="upload" element={<AddUser />} />
                  </Route>
                  <Route
                    path="messages"
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        loading={meLoading}
                      >
                        <Adminmessages />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute
                        isAuthenticated={isAuthenticated}
                        loading={meLoading}
                      >
                        <AdminUsers />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
              <Footer />
            </BrowserRouter>

            <div className="fixed bottom-4 right-4 z-50">
              {isVisible && (
                <button
                  onClick={scrollToTop}
                  className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-opacity duration-300 relative group"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="-204.8 -204.8 1433.60 1433.60"
                    class="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                    stroke="#000000"
                    stroke-width="0.01024"
                  >
                    <g
                      id="SVGRepo_bgCarrier"
                      stroke-width="0"
                      transform="translate(0,0), scale(1)"
                    >
                      <rect
                        x="-204.8"
                        y="-204.8"
                        width="1433.60"
                        height="1433.60"
                        rx="716.8"
                        fill="#0285AD"
                        strokewidth="0"
                      ></rect>
                    </g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="14.336000000000002"
                    >
                      <path
                        d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z"
                        fill="#ffffff"
                      ></path>
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </svg>
                  <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-400 text-white text-xs p-1 rounded-md px-1 opacity-0 group-hover:opacity-100  transition-opacity duration-300 whitespace-nowrap">
                    Scroll to Top
                  </span>
                </button>
              )}
            </div>
          </div>
          <ToastContainer id="main" closeOnClick stacked closeButton />
        </ProductsContextProvider>
      </MeContextProvider>
    </>
  );
}

export default App;
