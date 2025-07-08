import { getAllOrders, postStartTrip, postEndTrip, postStartOrder, postEndOrder } from '../js/services.js';

var intervalSimulate = null
var duration = 0
var orderCounter = 0

var idRoute
var idUser
var trip
var orders = []
var myOrders = []
var traveling = false

window.addEventListener('load', init)

function init(){
    console.log('Initializing document...')
    //Trae todas las ordenes de la DB
    setOrders()

    document.getElementById('trip-info').addEventListener('click', () => {
        printTrip()
    })
    document.getElementById('simulate-trip').addEventListener('click', () => {
        simulate()
    })
}

//Setup
function setOrders(){
    getAllOrders().then( (response) => {orders = response.data})
}
function setRoute(){
    idRoute = document.getElementById('route-id').value
}
function setUser(){
    idUser = document.getElementById('user-id').value
}
function printTrip(){
    console.log(trip)
}

async function simulate(){
    setRoute()
    setUser()

    await startTrip()
    getOrders()
    await endOrder(trip.id, trip.orders[0].idOrder)

    time()
}

function randomDuration(){
    duration = Math.random().toFixed(1) * 10000
    if (duration < 3000)
        randomDuration()
}

async function startTrip(){
    console.log('Viaje Empezado')
    if (idRoute != null) {
            await postStartTrip(idRoute).
                then( (response) => {
                    trip = response.data
                    trip.startHour = new Date()
                    console.log(trip)
        })
    }
    else
        console.log('Route ID is missing')
}

function getOrders(){
    //Guardar las ordenes para el conductor
    orders.forEach(o => {
        if (o.createdBy.id == idUser) {
            myOrders.push(o)
        }
    });
}

async function endOrder(tripId, orderId){
    await postEndOrder(tripId, orderId)
        .then((response) => { console.log(response) })
}

async function startOrder(tripId, orderId){
    await postStartOrder(tripId, orderId)
        .then((response) => { console.log(response) })
}

async function travel(){
    traveling = !traveling

    if (orderCounter < myOrders.length) {
        if (traveling) {
            await startOrder(trip.id, myOrders[orderCounter].id)
            console.log('Rumbo a ' + myOrders[orderCounter].store.name)
            
            time()
        }
        else{
            await endOrder(trip.id, myOrders[orderCounter].id)
            orderCounter++
            
            travel()
        }
    }
    else{
        endTrip()
        clearInterval(intervalSimulate)
    }
}

function time(){
    clearInterval(intervalSimulate)
    randomDuration()
    intervalSimulate = setInterval(travel, duration)
}

async function endTrip(){
    await postEndTrip(trip.id)
        .then( (response) => {
            console.log(response)
            trip.end_hour = new Date()
            trip.total_time = trip.end_hour - trip.startHour
        })
    console.log(trip)
    console.log('Viaje terminado en ' + (trip.total_time/1000).toFixed(0) + " segundos.")      
}
