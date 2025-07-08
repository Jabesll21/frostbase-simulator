import { postReading, postAlert } from './services.js';

let targetTemp = -5;
let truckId = 'TRK001';
let readingInterval = 5;
let doorEventInterval = 30;

let temperature = -5;
let humidity = 85;
let doorOpen = false;
let count = 0;
let readingTimer = null;
let doorTimer = null;
let startTime = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start').addEventListener('click', startSimulation);
    document.getElementById('stop').addEventListener('click', stopSimulation);
});

function startSimulation() {
    console.log('Iniciando simulación');
    console.log('Temperatura objetivo:', targetTemp + '°C');
    console.log('Camión ID:', truckId);

    startTime = new Date();
    count = 0;

    temperature = targetTemp + (Math.random() - 0.5) * 0.2;
    humidity = 85 + (Math.random() - 0.5) * 5;
    doorOpen = false;

    readingTimer = setInterval(takeReading, readingInterval * 1000);
    doorTimer = setInterval(doorEvent, doorEventInterval * 1000);

    takeReading();
}

function stopSimulation() {
    console.log('Simulación detenida');

    clearInterval(readingTimer);
    clearInterval(doorTimer);

    readingTimer = null;
    doorTimer = null;

    if (startTime) {
        const hours = (new Date() - startTime) / (1000 * 60 * 60);
        console.log(`Tiempo funcionando: ${hours.toFixed(2)} horas`);
        console.log(`Lecturas totales: ${count}`);
    }
}

function takeReading() {
    let tempChange = (Math.random() - 0.5) * 0.4;
    if (doorOpen) tempChange += Math.random() * 0.5 + 0.3;
    temperature += tempChange;

    const diff = temperature - targetTemp;
    if (Math.abs(diff) > 0.5) temperature -= diff * 0.1;

    const humidityChange = (Math.random() - 0.5) * 3;
    humidity = Math.max(50, Math.min(100, humidity + humidityChange));

    count++;
    showReading();
    checkAlerts();
    sendToMongoDB();
}

function showReading() {
    const time = new Date().toLocaleTimeString();
    const tempStr = temperature.toFixed(1);
    const humidityStr = humidity.toFixed(1);
    const doorStatus = doorOpen ? 'ABIERTA' : 'CERRADA';
    const variance = (temperature - targetTemp).toFixed(2);

    console.log(`[${count.toString().padStart(4, '0')}] ${time} | Temp: ${tempStr}°C | Var: ${variance}°C | Hum: ${humidityStr}% | Puerta: ${doorStatus}`);
}

function checkAlerts() {
    const variance = Math.abs(temperature - targetTemp);

    if (variance > 2.0) {
        console.error('Alerta crítica: Temp ' + temperature.toFixed(1) + '°C');
        sendAlert('Critico', variance);
    } else if (variance > 1.5) {
        console.warn('Advertencia: Temp ' + temperature.toFixed(1) + '°C');
        sendAlert('WARNING', variance);
    }

    if (humidity > 95 || humidity < 60) {
        console.warn('Advertencia: Humedad ' + humidity.toFixed(1) + '%');
        sendAlert('WARNING', 0);
    }
}

function doorEvent() {
    if (Math.random() < 0.09) {
        doorOpen = !doorOpen;
        console.log(`Evento: Puerta ${doorOpen ? 'abierta' : 'cerrada'}`);
        sendDoorEvent(doorOpen);
    }
}

function sendToMongoDB() {
    const data = {
        IDTruck: truckId,
        date: new Date().toISOString(),
        door_state: doorOpen,
        temp: parseFloat(temperature.toFixed(2)),
        perc_humidity: parseFloat(humidity.toFixed(2))
    };

    if (count % 5 === 0) {
        console.log('BD:', JSON.stringify(data, null, 2));
        postReading(truckId, data);
    }
}

function sendAlert(level, variance) {
    const alertData = {
        IDTruck: truckId,
        date: new Date().toISOString(),
        state: level === 'Critico',
        detected_value: parseFloat(temperature.toFixed(2)),
        IDAlertType: level === 'Critico' ? 1 : 2
    };

    console.log('Alerta:', JSON.stringify(alertData, null, 2));
    postAlert(alertData);
}

function sendDoorEvent(isOpen) {
    const doorData = {
        IDTruck: truckId,
        state: isOpen,
        time_opened: isOpen ? new Date().toISOString() : null
    };

    console.log('Puerta:', JSON.stringify(doorData, null, 2));
}

// Estadísticas cada minuto
setInterval(() => {
    if (count > 0 && startTime) {
        const hours = (new Date() - startTime) / (1000 * 60 * 60);
        const rate = count / hours;
        console.log(`Estadísticas: ${hours.toFixed(2)}h | ${count} lecturas | ${rate.toFixed(1)} lecturas/hora`);
    }
}, 60000);

