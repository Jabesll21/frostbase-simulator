import { config } from '../js/config.js';

//generate order
export async function generateOrders(date){
    //url
    var url = config.api.url + "order/generate-by-date";
    console.log(url);
    //fetch
    return await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date })
    })
    .then( (result) => { return result.json(); })
    .catch( (error) => { console.error(error) })
}

//generate trips
export async function generateTrips(date){
    //url
    var url = config.api.url + "trip/generate-by-date";
    console.log(url);
    //fetch
    return await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date })
    })
    .then( (result) => { return result.json(); })
    .catch( (error) => { console.error(error) })

}

//generate trips
export async function checkTrips(){
    //url
    var url = config.api.url + "trip/check";
    console.log(url);
    //fetch
    return await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        } })
    .then( (result) => { return result.json(); })
    .catch( (error) => { console.error(error) })
}
