let geo = require('georedis').initialize(redisClient)

exports.geoQuery =  (query) => {
    return new Promise(function(resolve, reject) {
        geo.location(query, function(err, location){
            if(err)reject(err)
            else resolve(location)
        })
    })
}

exports.getRandom = (arr, n)  => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
exports.asyncForEach = async  ({payload = {}, version = 100, mock = false, doc = false}  , callback) => {
    try {
        const { array } = payload ;
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array)
        }
    } catch (e) {
        throw e
    }
}