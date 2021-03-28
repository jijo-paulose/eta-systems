require('dotenv').config();
require( "babel-register" )( {presets: [ "env" ]} );
require("babel-polyfill")
require("./server")