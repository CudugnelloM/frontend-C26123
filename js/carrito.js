import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";   
import { vaciarCarrito, finalizarCompra, eliminarDelCarrito} from "./funcionesCarrito.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito"); 

    actualizarContador(carrito);
    contenedorCarrito.innerHTML = "";
   

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.classList.add("mensaje-vacio");
        mensajeVacio.textContent = "Tu carrito está vacío.";
        contenedorCarrito.appendChild(mensajeVacio);
        divAcciones.hidden = true;

        return;
    }
    divAcciones.hidden = false;

    carrito.forEach((productoApi) => {
        const nombre = productoApi.nombre ?? productoApi.title;
        const imagenProducto = 
            productoApi.img ?? productoApi.thumbnail;
        const descripcionProducto = 
            productoApi.descripcion ?? productoApi.description;
        const precioProducto = 
            Number(productoApi.precio ?? productoApi.price) || 0;

        const cantidad = Number(productoApi.cantidad) || 1;
        const subtotal = precioProducto * cantidad;

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = imagenProducto;
        imagen.alt = nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = descripcionProducto;

        const precio = document.createElement("p");
        precio.textContent = `Precio: $${precioProducto}`;

        const textoCantidad = document.createElement("p");
        textoCantidad.textContent = `Cantidad: ${cantidad}`;

        const textoSubtotal = document.createElement("p");
        textoSubtotal.textContent = `Subtotal: $${subtotal.toFixed(2)}`;

       const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn-eliminar");
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", () => {
            eliminarDelCarrito(productoApi.id);
            renderizarCarrito();
        });

   
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(textoCantidad);
        tarjeta.appendChild(textoSubtotal);
        tarjeta.appendChild(botonEliminar);
       

        contenedorCarrito.appendChild(tarjeta);
        });
    };
  
    document.addEventListener("DOMContentLoaded", () => {
        renderizarCarrito();

    const botonVaciar = document.getElementById("vaciar-carrito");

    if (botonVaciar) {
        botonVaciar.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción vaciará tu carrito de compras.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, vaciar carrito",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    vaciarCarrito();
                    renderizarCarrito();

                    Swal.fire(
                        "¡Carrito vaciado!"
                    );
                }
            });
        });
    }

    const botonFinalizar = document.getElementById("finalizar-compra");

    ///
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", () => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción finalizará tu compra.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, finalizar compra",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    finalizarCompra();
                    renderizarCarrito();

                    Swal.fire(
                        "¡Compra finalizada!"
                    );
                }
            });
        });
    }
});