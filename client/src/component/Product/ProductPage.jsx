import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductPage.css";
import Loader from "../layouts/Loader/Loader";
function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let errorMessage = "Product Updation failed";
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const url = `/api/v1/product/${id}`;

      const { data } = await axios.get(url);

      setProduct(data.product);
      setLoading(false);
    } catch (error) {
      errorMessage = error.response.data.message;
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (error) {
      toast.error(errorMessage);
      navigate("/");
    } else {
      fetchProduct();
    }
  }, [error]);

  return (
    <>
      <>
        {loading ? (
          <>
            {" "}
            <Loader />{" "}
          </>
        ) : (
          <>
            {product && (
              <div className="Product-Page py-20  md:pt-[5rem] lg:w-[90%] xl:w-[80%]  mx-auto">
                {/* Images and features */}
                <div className="image-feature-name md:flex mb-36  min-h-[80vh] md:space-x-6  md:items-center lg:items-start">
                  <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showStatus={false}
                    swipeable={true}
                    stopOnHover={true}
                    className="w-full text-center md:w-1/2 lg:w-[50%] "
                  >
                    {product.images.map((i, idx) => (
                      <div>
                        <img
                          key={idx}
                          src={i.url}
                          alt={i.url}
                          className="md:rounded-2xl"
                        />
                      </div>
                    ))}
                  </Carousel>

                  <div className="name-features w-full md:w-1/2 px-4  h-full  md:px-0 flex flex-col  ">
                    <h1 className="product-name  text-center md:text-start  text-3xl md:text-4xl my-4 font-bold">
                      {product.title}
                    </h1>
                    <div
                      className="html-string product-features leading-7  "
                      dangerouslySetInnerHTML={{ __html: product.features }}
                    ></div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="specs my-16  px-2 md:px-0">
                  <h3 className="Spec-heading my-7 font-semibold text-4xl text-center">
                    Specifications
                  </h3>
                  <div
                    className="html-string product-specs shadow-xl !mdd:w-[80%] mx-auto  "
                    dangerouslySetInnerHTML={{ __html: product.specs }}
                  ></div>
                </div>

                {/* Overview */}
                <div className="overview 3   px-3">
                  <h3 className="Spec-heading font-semibold text-4xl text-center mb-3">
                    Overview
                  </h3>
                  <div
                    className="html-string  html-string-overview product-features md:text-lg  "
                    dangerouslySetInnerHTML={{ __html: product.overview }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
}

export default ProductPage;
