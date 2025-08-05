import { simulateByDateRange, generateOrders, generateTrips, checkTrips } from './services.js';

let checkInterval = null;
const intervalTime = 10000;

let start, end;

window.addEventListener('load', init);

function init() {
    console.log('Initializing document...');

    const date = formatDate(new Date())

    document.getElementById('order-date').value = date;
    document.getElementById('trip-date').value = date;
    document.getElementById('start-date').value = date;
    document.getElementById('end-date').value = date;

    start = document.getElementById('start-check');
    end = document.getElementById('stop-check');

    document.getElementById('start-order').addEventListener('click', startOrders);
    document.getElementById('start-trip').addEventListener('click', startTrips);
    document.getElementById('start-simulate').addEventListener('click', startGenerating);
    document.getElementById('start-check').addEventListener('click', startCheckTrips);
    document.getElementById('stop-check').addEventListener('click', stopCheckTrips);

}

async function startOrders() {
    const date = document.getElementById('order-date').value;
    const res = await generateOrders(date);
    console.log('Orders generated:', res);
}

async function startTrips() {
    const date = document.getElementById('trip-date').value;
    const res = await generateTrips(date);
    console.log('Trips generated:', res);
}
async function startGenerating(){
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('start-date').value;

    const res = await simulateByDateRange(start, end);
    console.log('Simulation generated '+start+' - '+end+':', res);
}

async function startCheckTrips() {

    start.style.borderColor = null
    end.style.borderColor = "#eee"

    if (checkInterval) return;

    checkTrips();
    checkInterval = setInterval(async () => {
        const res = await checkTrips();
        console.log('Check trips:', res);
    }, intervalTime);
    console.log('Check trips iniciado');
}

async function stopCheckTrips() {
    start.style.borderColor = "#eee"
    end.style.borderColor = null
    if (checkInterval) {

        clearInterval(checkInterval);
        checkInterval = null;
        console.log('Check trips detenido');
    }
}

export function formatDate(date){
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}