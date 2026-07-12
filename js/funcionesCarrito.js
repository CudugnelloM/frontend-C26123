import { obtenerCarrito, guardarCarrito, limpiarCarrito } from './storage.js';
import { actualizarContador, mostrarMensaje } from "./ui.js"


export const agregarAlCarrito = (producto) => {
    if (!producto) {
        mostrarMensaje("No hay productos disponibles para agregar al carrito.");
        return;
    }
    const carrito = obtenerCarrito();
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
         productoExistente.cantidad =
            (Number(productoExistente.cantidad) || 0) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("Producto agregado ✅", "success");
};

export const eliminarDelCarrito = (productoId) => {
    const carrito = obtenerCarrito();

    const carritoActualizado = carrito.filter(
        (producto) => producto.id !== productoId
    );

    guardarCarrito(carritoActualizado);
    actualizarContador(carritoActualizado);
    mostrarMensaje("Producto eliminado ❎");

};

export const finalizarCompra = () => {
    limpiarCarrito();
    actualizarContador([]);
    mostrarMensaje("Compra finalizada ✅", "success");
}

export const vaciarCarrito = () => {
    limpiarCarrito();
    actualizarContador([]);
    mostrarMensaje("Carrito vaciado ❌");
}