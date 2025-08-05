import { config } from '../js/config.js';
import { formatDate } from "./main.js";

//generate order
export async function simulateByDateRange(start, end){
    //url
    var url = config.api.url + "generate/"+start+"&"+end;
    console.log(url);
    //fetch
    return await fetch(url, {
        method: 'post'
    })
    .then( (result) => { return result.json(); })
    .catch( (error) => { console.error(error) })
}
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
