import { Router } from "express";
import * as controller from "./controller";

const router = new Router();
router.post("/",controller.setLocation);
router.get("/",controller.getLocation);


export default router;
