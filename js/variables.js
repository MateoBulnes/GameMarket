class Producto {
    constructor(id, nombre, precio, cantidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad_agregada = cantidad;
        this.url_img_portada = img;
    }
}

const APIKEY = 'ab3f311c85ad41f9a7c19d1af78a7fa8';
const url_api = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2020-01-01,2023-12-31&ordering=-added`;
var juegos;

//Productos en carrito y disponibles
var productos_carrito = [];
var productos_disponibles = [];
var contenedor_carrito = document.querySelector('#container_carrito');

//Modal para mostrar alertas o errores
var modal_alerta = new bootstrap.Modal(document.getElementById('modal_alerta'), {});

//botones que disparan eventos
var botones_agregar;
var btn_carrito = document.querySelector('#shoppingCart img');
var btn_filtrar = document.querySelector('#btn_filtrar');
var btn_cerrar_alerta = document.querySelector('#modal_filtros .alerta .btn_cerrar_alerta');
var btn_limpiar_filtros = document.querySelector('#btn_limpiar_filtros');