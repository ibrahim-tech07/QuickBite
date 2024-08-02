import express from "express"
import { getMyOrders, postOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/orderData", postOrder);
router.post("/myorderData", getMyOrders);

export default router;