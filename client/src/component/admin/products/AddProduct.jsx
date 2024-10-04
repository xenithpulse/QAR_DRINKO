import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
function AddProduct() {
  const featuresRef = useRef(null);
  const overviewRef = useRef(null);
  const specsRef = useRef(null);
  const [title, settitle] = useState("");
  const [features, setfeatures] = useState("");
  const [overview, setoverview] = useState("");
  const [specs, setspecs] = useState("");
  const [featured, setfeatured] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState(null);
  const [success, setsuccess] = useState(false);
  const [postProductRequestError, setpostProductRequestError] = useState(null);
  const [message, setmessage] = useState("");

  const featuresPlaceholder = "Enter you product's features here ......";
  const featureJoditConfig = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder:
        featuresPlaceholder || "Enter you product's features here ......",
      height: 500,
    }),
    [featuresPlaceholder]
  );

  const overveiwPlaceholder = "Enter you product's overview here ......";
  const overviewJoditConfig = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder:
        overveiwPlaceholder || "Enter you product's overview here ......",
      height: 500,
    }),
    [overveiwPlaceholder]
  );

  const handleFileChange = (e) => {
    const files = e.target.files;
  
    if (files) {
      const newImages = [];
      const newImagesPreview = [];
  
      const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
  
          reader.onload = () => {
            if (reader.readyState === 2 && reader.result) {
              resolve({ file, imageUrl: reader.result });
            }
          };
  
          reader.onerror = reject;
  
          reader.readAsDataURL(file);
        });
      };
  
      const readFiles = async (files) => {
        for (const file of Array.from(files)) {
          const result = await readFile(file);
          newImages.push(result.file);
          newImagesPreview.push(result.imageUrl);
        }
  
        setImages(newImages);
        setImagesPreview(newImagesPreview);
      };
  
      readFiles(files);
    }
  };

  const postProductRequest = async (formData) => {
    toast.loading("Product creating....");
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const url = `/api/v1/products`

      await axios.post(
       url,
        formData,
        config
      );

   

      toast.dismiss();
      setmessage("Product have been added . ");
      setImages([]);
      setImagesPreview([]);
      setfeatures("");
      setoverview("");
      setspecs("");
     
      setsuccess(true);
      
    } catch (error) {
      toast.dismiss(); 
      setpostProductRequestError(true);
    
      setmessage(error.response.data.message || "Something went wrong");

      setsuccess(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !features || !overview || images.length < 1 || !specs) {
      toast.info("Enter All values ");

      return;
    }


    const formData = new FormData();
    formData.append("title", title);
    formData.append("overview", overview);
    formData.append("features", features);
    formData.append("productImages", images);
    formData.append("specs", specs);
    formData.append("featured", featured);

    images.forEach((file) => {
      formData.append(`productImages`, file);
    });

   
    await postProductRequest(formData);
  };

  const clearError = () => {
    setpostProductRequestError(false);
    setmessage("");
  };

  useEffect(() => {
   
    if (postProductRequestError) {
      // {Show toast}
      toast.warn(message || "Product upload fail");
      clearError();
    }

    if (success) {
      toast.success(message || "Product upload successfull ");
      setmessage("");
      setsuccess(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postProductRequestError, success]);

  return (
    <div className="mt-9 ">
      <form action="" className="w-[95%] mx-auto ">
        <div className="product-name ">
          <div className="label-product-title text-center my-7">
            <label className="text-xl underline underline-offset-8 ">
              Product Name
            </label>
          </div>

          <div className="relative  h-10 w-full min-w-[200px] max-w-[24rem] mb-6">
            <input
              type="text"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Product Name
            </label>
          </div>
        </div>

        {/* // Add Features  // */}
        <div className="add-features my-7">
          <div className="label-features text-center">
            <label
              htmlFor="features-editor-box"
              className="text-xl underline underline-offset-8 "
            >
              Add Features
            </label>
          </div>

          <div
            className="features-editor-box mt-6"
            id="features-editor-box"
            name="features-editor-box"
          >
            <JoditEditor
              ref={featuresRef}
              value={features || ""}
              config={featureJoditConfig}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setfeatures(newContent)} // preferred to use only this option to update the content for performance reasons
            />
          </div>
        </div>

        {/* // Add Overview  // */}

        <div className="add-Overview my-7">
          <div className="label-overview text-center">
            <label
              htmlFor="overview-editor-box"
              className="text-xl underline underline-offset-8 "
            >
              Add overview
            </label>
          </div>

          <div
            className="overview-editor-box mt-6"
            id="features-editor-box"
            name="features-editor-box"
          >
            <JoditEditor
              ref={overviewRef}
              value={overview || ""}
              config={overviewJoditConfig}
              tabIndex={1}
              onBlur={(newContent) => setoverview(newContent)}
            />
          </div>
        </div>

        {/* Add Specs */}
        <div className="add-specs my-14">
          <div className="label-specs text-center">
            <label
              htmlFor="specs-editor-box"
              className="text-xl underline underline-offset-8 "
            >
              Add Specifications ( better as table )
            </label>
          </div>

          <div
            className="specs-editor-box mt-6"
            id="specs-editor-box"
            name="specs-editor-box"
          >
            <JoditEditor
              ref={specsRef}
              value={specs || ""}
              config={overviewJoditConfig}
              tabIndex={1}
              onBlur={(newContent) => setspecs(newContent)}
            />
          </div>
        </div>

        {/* Add product images */}
        <div className="images-container py-7">
          <div className="label-productImages text-center mb-8">
            <label
              htmlFor="productImagesInput"
              className="text-xl underline underline-offset-8 "
            >
              Add Product's Images
            </label>
          </div>
          <input
            type="file"
            name="productImages"
            id=""
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />

          <div className="flex flex-wrap my-4 ">
            {imagesPreview &&
              imagesPreview.length > 0 &&
              imagesPreview.map((image, index) => (
                <img
                  key={index}
                  src={`${image}`}
                  alt={`Preview ${index}`}
                  className="w-20 mx-1"
                />
              ))}
          </div>
        </div>
        {/* Featured or Not */}
        <div className="images-container py-7">
          <label
            htmlFor="Featured"
            className="text-xl underline underline-offset-8 mr-4 "
          >
            Featured or Not
          </label>

          <input
            type="checkbox"
            name="Featured"
            id="Featured"
            onChange={(e) => {
              setfeatured(e.target.checked);
              
            }}
          
          />
        </div>
        {/* Submit button */}
        <div className="add-btn flex justify-center mt-9 mb-11">
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="mx-auto bg-[#0285AD] px-8 py-4 rounded-full text-white "
          >
            Add Product
          </button>
        </div>
      </form>
      {message && <div className="toast">{message}</div>}
    </div>
  );
}

export default AddProduct;
