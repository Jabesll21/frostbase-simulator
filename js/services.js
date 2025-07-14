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

//get stores
export async function getAllStores(){
    //url
    var url = config.api.url + "store/";
    console.log(url);
    //fetch
    return await fetch(url, { method: 'get' })
        .then( (result) => { return result.json(); })
        .catch( (error) => { console.error(error) })
}
//get stores that not ordered yet
export async function getAllStoresNotOrdered(){
    //url
    var url = config.api.url + "store/no-ordered";
    console.log(url);
    //fetch
    return await fetch(url, { method: 'get' })
        .then( (result) => { return result.json(); })
        .catch( (error) => { console.error(error) })
}
//get if a store ordered yet
export async function checkStoreOrdered(id){
    //url
    var url = config.api.url + "store/ordered/"+id;
    console.log(url);
    //fetch
    return await fetch(url, { method: 'get' })
        .then( (result) => { return result.json(); })
        .catch( (error) => { console.error(error) })
}

//post a order
export async function postOrder(order){
    //url
    var url = config.api.url + "order";
    console.log(url);
    //fetch
    return await fetch(url, { 
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    })
    .then( (result => { return result.json(); }))
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