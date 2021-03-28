import {getRandom,asyncForEach} from "../helpers"
import rn from 'random-number';

var options = {
    min:  100000
  , max:  1000000
  , integer: true
  }

export const generateRandomOrders = async (req, res, next) => {    

    try{

        let locations = getRandom(config.orderLocations,3)
        let orders = []

        await asyncForEach( {payload :{array: locations } } , async ( item ) => {
            orders.push({id:rn(options),place:item,location:{},orderState:"ON_DELIVERY"})
        })
        await redisClient.set('orders', JSON.stringify(orders))
        return res.status(200).json(orders);
       
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: e })
    }
}

export const getRandomOrders = async (req, res, next) => {    

    try{
        let data = await redisClient.getAsync('orders');
        console.log("response",JSON.parse(data))
        return res.status(200).json(JSON.parse(data));
       
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: e })
    }
}

export const updateOrders = async (req, res, next) => {    

    try{

        let {body} = req
    
        let action = body.action
        let data = await redisClient.getAsync('orders');
        let formatedData = JSON.parse(data)
        let index  = formatedData.findIndex(x => x.id === body.id );
        if(index  !== -1){
            formatedData[index].orderState =  action === 'start' ? "ACTIVE_DELIVERY" : action === 'finish' ?  "FINISHED_DELIVERY"  : "ON_DELIVERY"  
            formatedData[index].location = body.location 
        }

        if(action === 'finish'){
            if(index !== -1  && formatedData[index + 1]){
                formatedData[index + 1].orderState =  "ACTIVE_DELIVERY"
                if(body.nextend)
                formatedData[index + 1].location.end   = body.nextend
                formatedData[index + 1].location.start   = formatedData[index].location.end
                formatedData[index + 1].location.current = formatedData[index].location.end
            }
        }  
        await redisClient.set('orders', JSON.stringify(formatedData))
        return res.status(200).json(formatedData);
       
    }catch(e){
        console.log(e)
        return res.status(500).json({ error: e })
    }
}



