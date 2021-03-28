import {geoQuery} from "../helpers/index"

export const getLocation = async (req, res, next) => {    

    try{

        // geo.addLocation('Toronto', {latitude: 43.6667, longitude: -79.4167}, function(err, reply){
        //     if(err) console.error(err)
        //     else console.log('added location:', reply)
        //     return res.status(200).json({status : true});
        //   })

        let location = await geoQuery('Toronto')
        console.log(location)
        return res.status(200).json(location);
       
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: e })
    }
}

export const setLocation = async (req, res, next) => {    

    try{

        // geo.addLocation('Toronto', {latitude: 43.6667, longitude: -79.4167}, function(err, reply){
        //     if(err) console.error(err)
        //     else console.log('added location:', reply)
        //     return res.status(200).json({status : true});
        //   })

        let location = await geoQuery('Toronto')
        console.log(location)
        return res.status(200).json(location);
       
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: e })
    }
}

