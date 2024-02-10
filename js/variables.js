class Producto {
    constructor(id, nombre, precio, cantidad, img, categorias, plataformas) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad_agregada = cantidad;
        this.url_img_portada = img;
        this.categorias = categorias;
        this.plataformas = plataformas;
    }
}

var pagina_actual = 'index';

const APIKEY = 'ab3f311c85ad41f9a7c19d1af78a7fa8';
const url_api = `https://api.rawg.io/api/games?key=${APIKEY}&dates=2020-01-01,2023-12-31&ordering=-added`;
var juegos;

//Productos en carrito y disponibles
var productos_carrito = [];
var contenedor_carrito = document.querySelector('#container_carrito');

//Modal para mostrar alertas o errores
//var modal_alerta = new bootstrap.Modal(document.getElementById('modal_alerta'), {});

//botones que disparan eventos
var botones_agregar;
var btn_carrito = document.querySelector('#shoppingCart img');

var link_nav_productos = document.querySelector('#nav_productos');

var buscar_filtros = document.querySelector('#btn_buscar_filtros');
var busqueda_ingresada = document.querySelector('#input-busqueda');
var categorias_filtros = document.querySelectorAll('.filtro_categoria');
var plataformas_filtros = document.querySelectorAll('.filtro_plataforma');
var btn_limpiar = document.querySelector('#btn_limpiar');