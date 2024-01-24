class Producto {
    constructor(id, nombre, precio, cantidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad_agregada = cantidad;
        this.url_img_portada = img;
    }
}

//Productos en carrito y disponibles
var productos_carrito = [];
var productos_disponibles = [];
var contenedor_carrito = document.querySelector('#container_carrito');

//Modal para mostrar alertas o errores
var modal_alerta = new bootstrap.Modal(document.getElementById('modal_alerta'), {});

//botones que disparan eventos
var botones_agregar = document.querySelectorAll('.btn_agregar');
var btn_carrito = document.querySelector('#shoppingCart img');
var btn_filtrar = document.querySelector('#btn_filtrar');
var btn_alerta_filtro = document.querySelector('#btn_cerrar_alert_filtros');

var alerta_filtros = document.querySelector('#modal_filtros .alert-danger');