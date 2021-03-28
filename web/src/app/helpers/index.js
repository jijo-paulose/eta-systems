import queryString from "qs";
import moment  from "moment";
import config  from "../../config";

export const groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const objToUrlParams = obj => {
    return queryString.stringify(cleanObject(obj));
};
export const generateRandomKey = obj => {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const capitalize = str => {  
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getDate = date => {  
    return moment(date).format("DD MMMM  YYYY");
};

export function cleanObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj;
}
