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
export async function postTrip(idRoute){
    //url
    var url = config.api.url + "trip/" + idRoute;
    console.log(url);
    //fetch
    return await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(trip)
    })
    .then( (result => { return result.json(); }))
    .catch( (error) => { console.error(error) })
}