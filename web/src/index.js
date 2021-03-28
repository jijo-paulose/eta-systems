import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./registerServiceWorker"; 
import "antd/dist/antd.less";
import "./assets/css/style.css";
import "core-js/stable"
import "cross-fetch/polyfill";



ReactDOM.render(<App/>, document.getElementById("root"));
serviceWorker.register();