import Product from "../models/productsModel.js";
import catchAsyncFuncError from "../utils/catchAsyncFuntionErrors.js";
import { ErrorHandler } from "../utils/Errorhandler.js";
import {
  deletFilesFromCloudinary,
  uploadFilesToCloudinary,
} from "../utils/uploadFilesToCloudinary.js";

export const getAllProducts = catchAsyncFuncError(async (req, res) => {
  const products = await Product.find().select('title _id images featured');

  return res.status(200).json({
    success: true,
    products,
    productsCount: products.length,
  });
});

export const createProduct = catchAsyncFuncError(async (req, res, next) => {
 
  const images = req.files || [];

  if (images.length < 1) {
    return next(new ErrorHandler("Please Upload Product image", 400));
  }

  if (images.length > 10) {
    return next(new ErrorHandler("Images Can't be more than 10", 400));
  }

  const { title, features, overview, specs , featured } = req.body;

  try {
    const product = new Product({
      title,
      features,
      overview,
      images: {
        public_id: "sampleId",
        url: "sampleURl",
      },
      featured,
      specs,
    });

    await product.save();
    const attachments = await uploadFilesToCloudinary(images);

    const productToUpdated = await Product.findByIdAndUpdate(
      product._id,
      {
        images: attachments,
      },
      { new: true }
    );

    await productToUpdated.save();

    return res.status(200).json({ success: true, productToUpdated });
  } catch (error) {
    return res.status(400).json({ success: true, message: error.message });
  }
});

export const deleteProduct = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 400));
  }

 
  for(let i =0 ; i<product.images.length ; i++){
    
    await deletFilesFromCloudinary(product.images[i].public_id);
  }


  const deletedProduct = await Product.findByIdAndDelete(id);


  res.status(200).json({
    success: true,
    product:deletedProduct,
  });
});

export const changeFeatured = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler("Product Not found", 400));
  }

 
  const updatedProduct = await Product.findByIdAndUpdate(id , {featured:!product.featured},{new:true});


  res.status(200).json({
    success: true,
    product:updatedProduct,
  });
});

export const getProduct = catchAsyncFuncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if(!product){
    return next(new ErrorHandler("Product Not found", 400));
  }
  
  return res.status(200).json({
    success: true,
    product,
    
  });
});



