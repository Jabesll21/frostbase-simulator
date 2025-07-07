import { config } from '../js/config.js';

// //get stores
// export async function getAllStores(){
//     //url
//     var url = config.api.url + "store/";
//     console.log(url);
//     //fetch
//     return await fetch(url, { method: 'get' })
//         .then( (result) => { return result.json(); })
//         .catch( (error) => { console.error(error) })
// }

// //get routes
// export async function getAllRoutes(){
//     //url
//     var url = config.api.url + "route/";
//     console.log(url);
//     //fetch
//     return await fetch(url, { method: 'get' })
//         .then( (result) => { return result.json(); })
//         .catch( (error) => { console.error(error) })
// }

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
