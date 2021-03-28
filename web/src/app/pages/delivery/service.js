import { api, catchHandler } from "../../helpers/axios";
import config from "../../../config";

export function setLocation() {
    return api()
        .post(config.routes.location)
        .catch(catchHandler);
}
export function getLocation() {
    return api()
        .get(config.routes.location)
        .catch(catchHandler);
}
export function genarateOrder() {
    return api()
        .post(config.routes.orders)
        .catch(catchHandler);
}
export function listOrder() {
    return api()
        .get(config.routes.orders)
        .catch(catchHandler);
}
export function updateOrder(payload) {
    return api()
        .put(config.routes.orders,payload)
        .catch(catchHandler);
}




