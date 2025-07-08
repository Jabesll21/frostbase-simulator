import { config } from '../js/config.js';

//get orders
export async function getAllOrders(){
    //url
    var url = config.api.url + "order/";
    console.log(url);
    //fetch
    return await fetch(url, { method: 'get' })
        .then( (result) => { return result.json(); })
        .catch( (error) => { console.error(error) })
}

//post Trip
export async function postStartTrip(idRoute){
    //url
    var url = config.api.url + "trip/start/route/" + idRoute;
    console.log(url);
    //fetch
    return await fetch(url, { method: 'post' })
        .then( (result => { return result.json(); }))
        .catch( (error) => { console.error(error) })
}

//POST End Trip
export async function postEndTrip(idTrip){
    //url
    var url = config.api.url + "trip/end/" + idTrip;
    console.log(url);
    //fetch
    return await fetch(url, { method: 'post' })
        .then( (result => { return result.json(); }))
        .catch( (error) => { console.error(error) })
}

//POST Start Order
export async function postStartOrder(tripId, orderId){
    //url
    var url = config.api.url + "trip/" + tripId + "/order/" + orderId + "/start";
    console.log(url);
    //fetch
    return await fetch(url, { method: 'post' })
        .then( (result => { return result.json(); }))
        .catch( (error) => { console.error(error) })
}

//POST End Order
export async function postEndOrder(tripId, orderId){
    //url
    var url = config.api.url + "trip/" + tripId + "/order/" + orderId + "/end";
    console.log(url);
    //fetch
    return await fetch(url, { method: 'post' })
        .then( (result => { return result.json(); }))
        .catch( (error) => { console.error(error) })
}