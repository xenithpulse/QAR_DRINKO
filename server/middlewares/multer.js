import multer from "multer";

const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});




const productImages = multerUpload.array("productImages", 10);


export  {productImages};


// import multer from "multer";
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const storage = multer.diskStorage({
  
//   destination: null,

//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// export const upload = multer({ dest: null });
