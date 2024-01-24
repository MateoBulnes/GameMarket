//Al cargar la página cargo los productos disponibles para los filtros
document.addEventListener('DOMContentLoaded', obtener_carrito_storage);
document.addEventListener('DOMContentLoaded', llenar_productos_disponibles);

//Le agrego un evento click a cada boton "agregar" de los productos en novedades
botones_agregar.forEach(function (btn) {
    btn.addEventListener('click', function () {
        let id = btn.id;

        agregar_producto(id);
    });
});

btn_carrito.addEventListener('click', mostrar_carrito);
btn_filtrar.onclick = filtrar_productos;
btn_cerrar_alerta.onclick = ocultar_alerta;
btn_limpiar_filtros.onclick = limpiar_filtros();





