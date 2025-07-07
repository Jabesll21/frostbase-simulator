
const stores = [
    {
        _id: 2001,
        name: "Gudis"
    },
    {
        _id: 2002,
        name: "Oxxo"
    },
    {
        _id: 2003,
        name: "Soriana"
    },
    {
        _id: 2004,
        name: "Ley"
    },
    {
        _id: 2005,
        name: "Calimax"
    },
    {
        _id: 2006,
        name: "Tiendita"
    },
]
const routes = [
    {
        _id: 3001,
        name: "Ruta Villa del Real",
        IDUser: 1001,
        stores: [{
            IDStore: 2001,
            sequence: 10
        },
        {
            IDStore: 2002,
            sequence: 20
        },
        {
            IDStore: 2003,
            sequence: 30
        }]
    },
    {
        _id: 3002,
        name: "Ruta Otay",
        IDUser: 1002,
        stores: [{
            IDStore: 2004,
            sequence: 10
        },
        {
            IDStore: 2005,
            sequence: 20
        },
        {
            IDStore: 2006,
            sequence: 30
        }]
    },
]
var orders = [
    {
        _id: 5001,
        date: new Date(),
        delivered: new Date(),
        IDUser: 1001,
        IDStore: 2001
    },
    {
        _id: 5002,
        date: new Date(),
        delivered: new Date(),
        IDUser: 1001,
        IDStore: 2002
    },
    {
        _id: 5003,
        date: new Date(),
        delivered: new Date(),
        IDUser: 1001,
        IDStore: 2003
    },
    {
        _id: 5004,
        date: new Date(),
        delivered: new Date(),
        IDUser: 1002,
        IDStore: 2004
    },
]

var routeCounter = 0
var intervalSimulate = null
var duration = 0
var orderCounter = 0

var idUser = 1001
var trip = {}
var myOrders = []
var store = ''

window.addEventListener('load', init)

function init(){
    console.log('Initializing document...')
    document.getElementById('trip-info').addEventListener('click', () => {
        printTrip()
    })
    document.getElementById('start-trip').addEventListener('click', () => {
        startTrip()
    })
    document.getElementById('continue-trip').addEventListener('click', () => {
        continueTrip()
    })
    document.getElementById('end-trip').addEventListener('click', () => {
        endTrip()
    })
    document.getElementById('simulate-trip').addEventListener('click', () => {
        simulate()
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
        _id: 1,
        date: new Date(),
        start_hour: new Date(),
        end_hour: '',
        total_time: '',
        IDRoute: 3001,
        orders: [],
        IDStateTrip: 0
    }
}

function getOrders(){
    //Guardar las ordenes para el conductor
    orders.forEach(o => {
        if (o.IDUser == idUser) {
            myOrders.push(o)
        }
    });
}

function startTrip(){
    trip.orders.push({
        IDOrder: orders[orderCounter]._id,
        IDStore: orders[orderCounter].IDStore,
        time_start: new Date(),
        time_end: ''
    })

    getStore(trip.orders[orderCounter].IDStore)
    console.log('Rumbo a ' + store)
}

function continueTrip(){
    trip.orders[orderCounter].time_end = new Date()
    getStore(trip.orders[orderCounter].IDStore)
    console.log('Viaje a ' + store + ' terminado en ' + duration/1000 + ' segundos')
    orderCounter++
    if (orderCounter < myOrders.length) {
        trip.orders.push({
            IDOrder: orders[orderCounter]._id,
            IDStore: orders[orderCounter].IDStore,
            time_start: new Date(),
            time_end: ''
        })
        getStore(trip.orders[orderCounter].IDStore)
        console.log('Rumbo a ' + store)

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
    trip.IDStateTrip = 2
    console.log('Viaje terminado en ' + (trip.total_time/1000).toFixed(0) + " segundos.")
    
    console.log(trip)
}

function getStore(idStore){
    stores.forEach(s => {
        if (s._id == idStore) {
            store = s.name
        }
    });
}