
import { Router } from "express";
import location from "./location"
import orders from "./orders"

export default () => {
    let api = Router();
    api.use("/location", location);
    api.use("/orders", orders);


    return api;
};
