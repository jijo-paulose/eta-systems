
global.rootRequire =  (name) => {
    return require(__dirname + '/' + name);
}
global.__basedir = __dirname;

import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import  useragent  from "express-useragent";
import redisConnect from "./src/redis";

import config from "config";
import path,{join} from "path";
import fs from 'fs';



let app = express();
app.server = http.createServer(app);
global.application = {};
global.config = config


// 3rd party middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(useragent.express());


app.get('/', (req, res) => {
    res.send( `<script>
        let r =new Date().valueOf() + ( ${(new Date().getTimezoneOffset())}  - (new Date().getTimezoneOffset()) ) * -60000;
        setInterval(()=>{document.body.innerHTML = (new Date(r+=1000)).toLocaleString("en",{weekday:"long", month:"long", day:"numeric", year:"numeric", hour:"numeric", minute:"numeric", second:"numeric", hour12:true})},1000);
        </script>`);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use( (req, res, next) => {
    application.protocol = req.protocol + "://";
    next();
});

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1)

})
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason.message}`)
    process.exit(1)
})

// connect to db
redisConnect()
    .then(db => {
        console.log("env:",process.env.NODE_ENV || 'development' );
        console.log("Connected to  redis");

        global.redisClient = db
        // console.log(global.redis)
       
                
        app.use("/api/v1",require("./src/api").default())
     

        // development error handler
        // will print stacktrace
        if (process.env.NODE_ENV !== "production") {
            app.use((err, req, res, next) => {
                console.log("err")
                let message = err ? err.toString() : "Unknown error";
                message = message.replace("Error:", "");
                res.status(err.status || 500);
                res.json({
                    message: message,
                    error: err || {}
                });
            });
        } else {
            // production error handler
            // no stacktraces leaked to user
            app.use((err, req, res, next) => {
                let message = err ? err.toString() : "Unknown error";
                message = message.replace("Error:", "");
                res.status(err.status || 500);
                res.json({
                    message: message,
                    error: {}
                });
            });
        }

        app.server.listen(process.env.PORT || config.port, () => {
            console.log(`App started on port ${config.port}`);
        });
    })
    .catch(err => {
        console.log(err)
        console.error("Redis connection error:");
    });

export default app;
