document.addEventListener('DOMContentLoaded', async function () {
    await traer_juegos();

    obtener_carrito_storage();
    llenar_productos_disponibles();
    //Le agrego un evento click a cada boton "agregar" de los productos en novedades
    botones_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });

    btn_carrito.onclick = mostrar_carrito;
    document.querySelector('#modal_carrito .modal-header button').onclick = limpiar_carrito;

    btn_filtrar.onclick = filtrar_productos;
    btn_cerrar_alerta.onclick = ocultar_alerta;
    btn_limpiar_filtros.onclick = limpiar_filtros;
    document.querySelector('#modal_filtros .modal-header button').onclick = limpiar_filtros;
});





