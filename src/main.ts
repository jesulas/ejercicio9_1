type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
    producto: Producto;
    cantidad: number;
}

const productos: LineaTicket[] = [
    {
      producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
      },
      cantidad: 2,
    },
    {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    },
    {
      producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
      },
      cantidad: 6,
    },
    {
      producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    },
  ];

const calculaTicket = (lineasTicket: LineaTicket[]) => {
    let single : ResultadoLineaTicket[] = [];
    for (let i = 0; i < lineasTicket.length; i++) {
        //Sale que single[i] es indefinido
      single[i].nombre = lineasTicket[i].producto.nombre;
      single[i].cantidad = lineasTicket[i].cantidad;
      single[i].precioSinIva = lineasTicket[i].producto.precio * lineasTicket[i].cantidad;
      single[i].tipoIva = lineasTicket[i].producto.tipoIva;
      single[i].precioConIva = calcularIVA( lineasTicket[i].producto.precio,lineasTicket[i].producto.tipoIva) * lineasTicket[i].cantidad;
    }
    let combined : ResultadoTotalTicket[] = [];
    combined[0].totalSinIva =  sumarSingleIVA(single);
    combined[0].totalConIva =  sumarSingleConIVA(single);
    combined[0].totalIva = combined[0].totalConIva - combined[0].totalSinIva;
    let tipoIVA : TotalPorTipoIva[] = []
    for (let i = 0; i < lineasTicket.length; i++){
        tipoIVA[i].tipoIva = single[i].tipoIva;
        tipoIVA[i].cuantia = single[i].precioConIva - single[i].precioSinIva
    }
    let finalTicket : TicketFinal [] = [];
    for( let i = 0; i < single.length; i++){
    finalTicket[i].lineas = single;
    finalTicket[i].total = combined[0];
    finalTicket[i].desgloseIva = tipoIVA;
    }
};

const calcularIVA = (precio: number ,tipoIVA:TipoIva) =>{
switch(tipoIVA){
    case "general":
        return precio * 0.21
    case "reducido":
        return precio * 0.1
    case "superreducidoA":
        return precio * 0.05
    case "superreducidoB":
        return precio * 0.04
    case "superreducidoC":
        return precio * 0
    case "sinIva":
        return precio * 0
}
}

const sumarSingleIVA = (single: ResultadoLineaTicket[]) => {
    let total = 0;
for(let i=0; i < single.length;i++){
total += single[i].precioSinIva
}
return total;
}
const sumarSingleConIVA = (single: ResultadoLineaTicket[]) => {
    let total = 0;
for(let i=0; i < single.length;i++){
total += single[i].precioConIva
}
return total;
}
//Done
interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precioSinIva: number;
    tipoIva: TipoIva;
    precioConIva: number;
  }
//Done
  interface ResultadoTotalTicket {
    totalSinIva: number;
    totalConIva: number;
    totalIva: number;
  }
//Done
  interface TotalPorTipoIva {
    tipoIva: TipoIva;
    cuantia : number;
  }

  interface TicketFinal {
    lineas: ResultadoLineaTicket[];
    total: ResultadoTotalTicket;
    desgloseIva: TotalPorTipoIva[];
  }

let ej1 = calculaTicket(productos);
console.log(ej1);