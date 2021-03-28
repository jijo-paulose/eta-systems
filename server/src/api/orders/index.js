import { Router } from "express";
import * as controller from "./controller";

const router = new Router();
router.post("/",controller.generateRandomOrders);
router.get("/",controller.getRandomOrders);
router.put("/",controller.updateOrders);

export default router;
