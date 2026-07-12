import { agregarAlCarrito } from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";
import { obtenerCarrito, limpiarCarrito } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const renderizarProductos = () => {
        const contenedorProductos = document.getElementById("contenedor-tarjetas");

        fetch("https://dummyjson.com/products/category/smartphones")
            .then((response) => response.json())
            .then((data) => {
                contenedorProductos.innerHTML = "";

                data.products.forEach((productoApi) => {
                    const producto = {
                        id: productoApi.id,
                        nombre: productoApi.title,
                        img: productoApi.thumbnail,
                        precio: productoApi.price,
                        descripcion: productoApi.description
                    };

                    const tarjeta = document.createElement("article");
                    tarjeta.classList.add("card");

                    const imagen = document.createElement("img");
                    imagen.src = producto.img;
                    imagen.alt = producto.nombre;

                    const titulo = document.createElement("h3");
                    titulo.textContent = producto.nombre;

                    const descripcion = document.createElement("p");
                    descripcion.textContent = producto.descripcion;

                    const precio = document.createElement("p");
                    precio.textContent = `$${producto.precio}`;

                    const boton = document.createElement("button");
                    boton.classList.add("btn-card");
                    boton.textContent = "Agregar al carrito";

                    boton.addEventListener("click", () => {
                        agregarAlCarrito(producto);
                    });

                    tarjeta.appendChild(imagen);
                    tarjeta.appendChild(titulo);
                    tarjeta.appendChild(descripcion);
                    tarjeta.appendChild(precio);
                    tarjeta.appendChild(boton);

                    contenedorProductos.appendChild(tarjeta);
                });
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error);
            });
    };
    
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    renderizarProductos();
});