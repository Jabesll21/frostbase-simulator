let simulacionActiva = false;
let timeoutId = null;
const tiendasQuePidieron = new Set();

function generarPedido() {
  const now = new Date();

 
  const IDStore = (Math.floor(Math.random() * 8) + 1).toString();


  if (tiendasQuePidieron.has(IDStore)) {

    return;
  }
  tiendasQuePidieron.add(IDStore);

  const pedido = {
    _id: (Math.floor(Math.random() * 1000000)).toString(),
    date: now.toISOString(),
    delivered: new Date(now.getTime() + (Math.floor(Math.random() * 2) + 1) * 24 * 60 * 60 * 1000).toISOString(),
    IDUser: (Math.floor(Math.random() * 1000) + 1).toString(),
    IDStore: IDStore
  };

  const horaStr = now.getHours().toString().padStart(2, '0');
  const minutoStr = now.getMinutes().toString().padStart(2, '0');
  console.groupCollapsed(`🛒 Pedido generado a las ${horaStr}:${minutoStr} hr`);
  console.log(pedido);
  console.groupEnd();
}

function obtenerProbabilidad(hora) {
  if (hora < 6) return 0.01;   
  if (hora < 10) return 0.25;  
  if (hora < 14) return 0.4;  
  if (hora < 18) return 0.25;  
  return 0.01;                
}

function simuladorDePedidos() {
  // Reinicia el registro de tiendas al iniciar el día
  tiendasQuePidieron.clear();

  function cicloTiempoReal() {
    if (!simulacionActiva) return;

    const now = new Date();
    const horaActual = now.getHours();
    const probabilidad = obtenerProbabilidad(horaActual);

    if (Math.random() < probabilidad) {
      generarPedido();
    }

    timeoutId = setTimeout(cicloTiempoReal, 60 * 1000); 
  }

  cicloTiempoReal();
}

document.getElementById('iniciar').onclick = function() {
  if (!simulacionActiva) {
    simulacionActiva = true;
    document.getElementById('pedidos').innerHTML = '';
    simuladorDePedidos();
  }
};

document.getElementById('detener').onclick = function() {
  simulacionActiva = false;
  clearTimeout(timeoutId);
};
