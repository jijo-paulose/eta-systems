import axios from "axios";
import config from "../../config";
import { history } from "../store";

export function api() {
    let opts = {
        baseURL: config.api.trim(),
    };
    return axios.create(opts);
}

export function catchHandler(e) { 
    let res =  e.response  && e.response.data ? e.response.data : {message:"Server restarting, please try again later."} ;
   
    if (e.response &&  e.response.status === 401) {
        history.push("/");
    }
    throw res
}
