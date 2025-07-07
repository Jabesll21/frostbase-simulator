import { config } from '../js/config.js';
import { getAllOrders } from '../js/services.js';

// var stores = []
// var routes = []
var orders = []

var intervalSimulate = null
var duration = 0
var orderCounter = 0

var idUser = 1002
var idTrip = 1002
var trip = {}
var myOrders = []

window.addEventListener('load', init)

function init(){
    console.log('Initializing document...')
    // setStores()
    // setRoutes()
    setOrders()

    document.getElementById('trip-info').addEventListener('click', () => {
        printTrip()
    })
    // document.getElementById('start-trip').addEventListener('click', () => {
    //     startTrip()
    // })
    // document.getElementById('continue-trip').addEventListener('click', () => {
    //     continueTrip()
    // })
    // document.getElementById('end-trip').addEventListener('click', () => {
    //     endTrip()
    // })
    document.getElementById('simulate-trip').addEventListener('click', () => {
        simulate()
    })
}

// function setStores(){
//     getAllStores().then( (response) => {
//         console.log(response.data)
//         stores = response.data
//     })
// }

// function setRoutes(){
//     getAllRoutes().then( (response) => {
//         console.log(response.data)
//         routes = response.data
//     })
// }

function setOrders(){
    getAllOrders().then( (response) => {
        console.log(response.data)
        orders = response.data
    })
}


function printTrip(){
    console.log(trip)
}

function simulate(){
    createTrip()
    getOrders()
    startTrip()
    randomDuration()
    intervalSimulate = setInterval(continueTrip, duration)
}

function randomDuration(){
    duration = Math.random().toFixed(1) * 10000
    if (duration < 3000)
        randomDuration()
}

function createTrip(){
    console.log('Viaje Empezado')

    trip = {
        date: new Date(),
        start_hour: new Date(),
        end_hour: '',
        total_time: '',
        IDRoute: idTrip,
        orders: [],
        IDStateTrip: 0
    }
}

function getOrders(){
    //Guardar las ordenes para el conductor
    orders.forEach(o => {
        if (o.user.id == idUser) {
            myOrders.push(o)
        }
    });
}

function startTrip(){
    trip.orders.push({
        IDOrder: myOrders[orderCounter].id,
        IDStore: myOrders[orderCounter].store.id,
        time_start: new Date(),
        time_end: ''
    })

    console.log('Rumbo a ' + nextStore() )
}

function continueTrip(){
    trip.orders[orderCounter].time_end = new Date()
    console.log('Viaje a ' +  nextStore() + ' terminado en ' + duration/1000 + ' segundos')
    orderCounter++
    if (orderCounter < myOrders.length) {
        trip.orders.push({
            IDOrder: orders[orderCounter].id,
            IDStore: orders[orderCounter].store.id,
            time_start: new Date(),
            time_end: ''
        })
        
        console.log('Rumbo a ' + nextStore() )

        clearInterval(intervalSimulate)
        randomDuration()
        intervalSimulate = setInterval(continueTrip, duration)
    }
    else{
        endTrip()
        clearInterval(intervalSimulate)
    }

}

function endTrip(){
    trip.end_hour = new Date()
    trip.total_time = trip.end_hour - trip.start_hour
    trip.IDStateTrip = 1
    console.log('Viaje terminado en ' + (trip.total_time/1000).toFixed(0) + " segundos.")
    
    console.log(trip)
}

function nextStore(){
    return myOrders[orderCounter].store.name
}



