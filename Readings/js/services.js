import { config } from "./config.js";

// lecturas de sensores
export async function postReading(truckId, readingData) {
    const url = `${config.api.url}Truck/${truckId}`;
    console.log('Enviando lectura a:', url);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(readingData)
        });
        
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        return result;
    } catch (error) {
        console.error('Error enviando lectura:', error);
        return null;
    }
}

// temperatura/humedad
export async function getParameters() {
    const url = `${config.api.url}Parameter`;
    console.log('Obteniendo parámetros desde:', url);
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error obteniendo parámetros:', error);
        return null;
    }
}

// alertas
export async function postAlert(alertData) {
    const url = `${config.api.url}Alert`;
    console.log('Enviando alerta a:', url);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alertData)
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error enviando alerta:', error);
        return null;
    }
}

// información de un camión
export async function getTruck(truckId) {
    const url = `${config.api.url}Truck/${truckId}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error obteniendo camión:', error);
        return null;
    }
}