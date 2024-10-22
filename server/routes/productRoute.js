import express  from "express" 
import { createProduct, deleteProduct, getAllProducts,changeFeatured, getProduct } from "../constrollers/productControllers.js";
import { productImages} from "../middlewares/multer.js";
import { isAuthenticatedAdmin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/products").get(getAllProducts).post(isAuthenticatedAdmin, productImages ,createProduct)
router.route("/product/:id").delete(isAuthenticatedAdmin,deleteProduct).put(isAuthenticatedAdmin,changeFeatured).get(getProduct)




export default router;