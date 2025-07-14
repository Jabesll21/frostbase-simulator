import { generateOrder } from "../services.js";

let intervalId = null;
let simulacionActiva = false;

function obtenerProbabilidad(hora) {
    if (hora < 6) return 0.01;
    if (hora < 10) return 0.25;
    if (hora < 14) return 0.4;
    if (hora < 18) return 0.25;
    return 0.01;
}

function cicloPedidos() {
    if (!simulacionActiva) return;
    const now = new Date();
    const horaActual = now.getHours();
    const probabilidad = obtenerProbabilidad(horaActual);

    const prob = Math.random() < probabilidad;
    console.log(prob)
    if (prob) {
        generateOrder().then((response) => {
            console.log("🛒 Pedido generado:", response);
        });
    }
}

export function start() {
    console.log("started...")
    if (simulacionActiva) return;
    simulacionActiva = true;
    cicloPedidos()
    intervalId = setInterval(cicloPedidos, 60000); // Ejecuta cada minuto
}

export function stop() {
    simulacionActiva = false;
    clearInterval(intervalId);
}
