import { config } from '../js/config.js';
import { getAllOrders, postTrip } from '../js/services.js';

var orders = []

var intervalSimulate = null
var duration = 0
var orderCounter = 0

var idRoute
var idUser = 1002
var trip = {}
var myOrders = []

window.addEventListener('load', init)

function init(){
    console.log('Initializing document...')
    setOrders()

    document.getElementById('trip-info').addEventListener('click', () => {
        printTrip()
    })
    document.getElementById('simulate-trip').addEventListener('click', () => {
        simulate()
    })
}

function setOrders(){
    getAllOrders().then( (response) => {
        console.log(response.data)
        orders = response.data
    })
}

function setRoute(){
    idRoute = document.getElementById('route-id').value
    console.log(idRoute)
}


function printTrip(){
    console.log(trip)
}

function simulate(){
    setRoute()
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
    if (idRoute != null) {
            postTrip(idRoute)
            postTrip(idRoute).then( (response) => {
            console.log(response.data)
            trip = response.data
        })
    }
    else
        console.log('Route ID is missing')
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
    //postTrip(trip)
}

function nextStore(){
    return myOrders[orderCounter].store.name
}



