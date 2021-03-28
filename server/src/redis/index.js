import config from "config";
import redis from "redis";
import { promisifyAll } from "bluebird";

promisifyAll(redis);


export default () => {

    return new global.Promise((resolve, reject) => {
        let client = redis.createClient({
            host: config.redis.host,
        });
        client.on("connect", () => {
            resolve(client);

        });
        client.on('error', err => {
            console.log('redis error ' + err);
            reject()
        });
    });
};
