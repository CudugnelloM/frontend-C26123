const KEY = "carrito";

export const obtenerCarrito = () => {
    return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const limpiarCarrito = () => {
    localStorage.removeItem(KEY);
};
