export const actualizarContador = (carrito = []) => {
    const contador = document.getElementById("contador-carrito");

    if (!contador) {
        return;
    }

    const cantidadTotal = carrito.reduce((total, producto) => {
        const cantidad = Number(producto.cantidad) || 0;

        return total + cantidad;
    }, 0);

    contador.textContent = cantidadTotal;
};

export const mostrarMensaje = (mensaje, icono = "success") => {
    if (window.Swal) {
        Swal.fire({
            text: mensaje,
            icon: icono,
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        alert(mensaje);
    }
};
