import { LineaTicket, TicketFinal } from "./interfaces";
import { devolvLineaTicket, obtenerTotalSinIva, obtenerTotalConIva, obteneterTotalPorTipo } from "./calculos";
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

const calculaTicket = (lineasTicket: LineaTicket[]) : TicketFinal => {
 const sinIva = obtenerTotalSinIva(lineasTicket);
 const conIva = obtenerTotalConIva(lineasTicket);
  return {
    lineas: devolvLineaTicket(lineasTicket),
    total: {
        totalSinIva: sinIva,
        totalConIva:conIva,
        totalIva: conIva + sinIva
    },
    desgloseIva: obteneterTotalPorTipo(lineasTicket)
  }
};


  let prueba = calculaTicket(productos);
  console.log(prueba);