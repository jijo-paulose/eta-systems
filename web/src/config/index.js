

console.log("env : ", process.env.REACT_APP_ENV || "development");

const serverPath = {
     development: "http://localhost:5000",
     staging: "",
    production: ""
};

const googlePlacesKey = {
    development: "test",//TODO - replace actual key here
    staging: "",
    production: "",
};


const server = serverPath[process.env.REACT_APP_ENV || "development"];
console.log("server : ", server);

let all = {

    routes : {
        location: "/location",
        orders:"/orders"
    },
    placesAPI: googlePlacesKey[process.env.REACT_APP_ENV || "development"],
    api: `${server}/api/v1`,
}; 


let env = {
    development: {
        
    },
    staging: {
 
       
    },
    production: {
        
       
    }
};

export default {
    ...all,
    ...env[process.env.REACT_APP_ENV || "development"]
};
