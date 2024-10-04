import express  from "express" 
import { getAdminDetails, getAdmins, loginAdmin, logoutAdmin, registerAdmin, removeAdmin } from "../constrollers/AdminControllers.js";
import { isAuthenticatedAdmin } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.route("/register/admin").post(isAuthenticatedAdmin,registerAdmin)
router.route("/remove/admin/:id").delete(isAuthenticatedAdmin,removeAdmin)

router.route("/login/admin").post(loginAdmin)
router.route("/registered/admins").get(isAuthenticatedAdmin,getAdmins)
router.route("/logout").post(logoutAdmin)
router.route("/me").get(isAuthenticatedAdmin,getAdminDetails)



export default router;