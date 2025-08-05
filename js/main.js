import { generateOrders, generateTrips, checkTrips } from './services.js';

let checkInterval = null;
const intervalTime = 10000; // 10 segundos

window.addEventListener('load', init);

function init() {
    console.log('Initializing document...');
    // Set default date as today in yyyy-MM-dd format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    document.getElementById('date').value = `${yyyy}-${mm}-${dd}`;

    document.getElementById('start-order').addEventListener('click', startOrders);
    document.getElementById('start-trip').addEventListener('click', startTrips);
    document.getElementById('start-check').addEventListener('click', startCheckTrips);
    document.getElementById('stop-check').addEventListener('click', stopCheckTrips);
}

async function startOrders() {
    const date = document.getElementById('date').value;
    if (!date) return alert('Selecciona una fecha');
    const res = await generateOrders(date);
    console.log('Orders generated:', res);
}

async function startTrips() {
    const date = document.getElementById('date').value;
    if (!date) return alert('Selecciona una fecha');
    const res = await generateTrips(date);
    console.log('Trips generated:', res);
}

function startCheckTrips() {
    if (checkInterval) return;
    checkInterval = setInterval(async () => {
        const res = await checkTrips();
        console.log('Check trips:', res);
    }, intervalTime);
    console.log('Check trips iniciado');
    checkTrips();
}

function stopCheckTrips() {
    if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
        console.log('Check trips detenido');
    }
}