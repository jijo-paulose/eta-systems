import axios from "axios"
import config from "../../../config";


export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition(resolve, reject);
        }
        return reject("Geolocation is not supported by this browser.");
    });
}

export   function getAddress(address) {
    return new Promise(function(resolve, reject) {
        axios({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${config.placesAPI}`,
            method: "GET", 
        })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

var rad = function(x) {
    return x * Math.PI / 180;
};
  
export function getDistance (p1, p2) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = rad(p2.lat - p1.lat);
    let dLong = rad(p2.lng - p1.lng);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return Math.round(d/80); // returns the distance in meter
};