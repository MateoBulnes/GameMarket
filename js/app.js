//Al cargar la página cargo los productos disponibles para los filtros
//document.addEventListener('DOMContentLoaded', llenar_productos_disponibles);

//Le agrego un evento click a cada boton "agregar" de los productos en novedades
botones_agregar.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let id = btn.id;

        agregar_producto(id);
    });
});

btn_carrito.addEventListener('click', ver_carrito);




