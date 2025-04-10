import {TipoIva, LineaTicket, ResultadoLineaTicket} from "./interfaces"
export const devolvLineaTicket = (lineasTicket: LineaTicket[]) : ResultadoLineaTicket[] => {
    const resultLineaTicket: ResultadoLineaTicket[] = lineasTicket.map((productos => {
        return {
            nombre: productos.producto.nombre,
            cantidad: productos.cantidad,
            precionSinIva: multiplica(productos.cantidad, productos.producto.precio),
            tipoIva: productos.producto.tipoIva,
            precioConIva: multiplica(productos.cantidad, calcularIVA(productos.producto.precio, productos.producto.tipoIva))
        }})) 
    return resultLineaTicket
}

const calcularIVA = (precio: number, tipoIva: TipoIva) => {
    switch (tipoIva){
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

const multiplica = (numero1: number, numero2: number) => {
return numero1 * numero2;
}

export const obtenerTotalSinIva = (lineasTicket: LineaTicket[]) : number=> {
 return lineasTicket.reduce((acc: number, lineaTicket:LineaTicket) => {
    return acc + lineaTicket.cantidad * lineaTicket.producto.precio;
 }, 0) 
}

export const obtenerTotalConIva = (lineasTicket: LineaTicket[]) : number=> {
    return lineasTicket.reduce((acc: number, lineaTicket:LineaTicket) => {
        const subTotal = lineaTicket.cantidad * lineaTicket.producto.precio;
        const IVA = calcularIVA(subTotal, lineaTicket.producto.tipoIva);
        return acc + IVA;
    }, 0) 
   }

const tiposDeIva: TipoIva[] = [
     "general","reducido","sinIva","superreducidoA","superreducidoB","superreducidoC"
]

export const obteneterTotalPorTipo = (lineasTicket:LineaTicket[]) => {
 return tiposDeIva.map((tipoIva: TipoIva) => {
    const productosFiltrados = lineasTicket.filter((lineaTicket:LineaTicket) => {
        return lineaTicket.producto.tipoIva === tipoIva;
      })
      const cuantia = obtenerTotalConIva(productosFiltrados);
      return {
        tipoIva: tipoIva,
        cuantia: cuantia
      }
 })
}