var orderSim = false;
var tripSim = false;
var readingSim = false;

window.addEventListener('load', init)

function init(){
    console.log('Initializing document...')
    document.getElementById('start').addEventListener('click', () => {
        orderSim = true;
        tripSim = true;
        readingSim = true;
        console.log("-- Starting all --")
        checkSim()
    })
    document.getElementById('stop').addEventListener('click', () => {
        orderSim = false;
        tripSim = false;
        readingSim = false;
        console.log("-- Stopping all --")
        checkSim()
    })
    document.getElementById('start-order').addEventListener('click', () => {
        orderSim = true;
        startOrders();
    })
    document.getElementById('stop-order').addEventListener('click', () => {
        orderSim = false;
        stopOrders();
    })

    document.getElementById('start-trip').addEventListener('click', () => {
        tripSim = true;
        startTrips();
    })
    document.getElementById('stop-trip').addEventListener('click', () => {
        tripSim = false;
        stopTrips();
    })

    document.getElementById('start-reading').addEventListener('click', () => {
        readingSim = true;
        startReadings();
    })
    document.getElementById('stop-reading').addEventListener('click', () => {
        readingSim = false;
        stopReadings();
    })
}

function checkSim(){
    if(orderSim) startOrders();
    else stopOrders();
    if(tripSim) startTrips();
    else stopTrips();
    if(readingSim) startReadings();
    else stopReadings();
}

async function startOrders(){
    console.log("Orders simulator...")
}
async function stopOrders(){
    console.log("Stoping Orders...")
}
async function startTrips(){
    console.log("Trips simulator...")
    
}
async function stopTrips(){
    console.log("Stoping Trips...")
}

async function startReadings(){
    console.log("Readings simulator...")
}

async function stopReadings(){
    console.log("Stoping Readings...")
}