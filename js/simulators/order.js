import { getAllStoresNotOrdered, checkStoreOrdered, postOrder} from "../services.js";

let timeoutId = null;
let simulacionActiva = false;

var adminId = "674a5001000000000000001a";

var storeList = [];

export function start(){

    getAllStoresNotOrdered().then((response) =>{
        console.log(response)
        storeList = response.data;
        generarPedido()
    });
}

async function generarPedido() {
 
    const index = Math.floor(Math.random() * storeList.length - 1);
    console.log(index)
    const store = storeList[index];

    //console.log(store)

    if (checkStoreOrdered(store.id) == 1) {
        storeList.splice(index, 1);
        return;
    }

    const pedido = {
        idCreatedByUser: adminId,
        idStore: store.id
    };

    //console.log(pedido);

    await postOrder(pedido).then((response) => {
        console.log(`🛒 ${store.name} ha generado un peido a las: ${response.data.date} `);
        console.log(response);
  })
  
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

// document.getElementById('iniciar').onclick = function() {
//   if (!simulacionActiva) {
//     simulacionActiva = true;
//     document.getElementById('pedidos').innerHTML = '';
//     simuladorDePedidos();
//   }
// };

// document.getElementById('detener').onclick = function() {
//   simulacionActiva = false;
//   clearTimeout(timeoutId);
// };
