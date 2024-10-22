import express  from "express" 
import { deleteMessage, getAllMessages, sendMessage } from "../constrollers/messageController.js";
import { isAuthenticatedAdmin } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/messages").get(isAuthenticatedAdmin, getAllMessages).post(sendMessage)

router.route("/messages/:id").delete(isAuthenticatedAdmin,deleteMessage)



export default router;