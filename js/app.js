document.addEventListener('DOMContentLoaded', async function () {
    pagina_actual = 'index';
    await traer_juegos();

    obtener_carrito_storage();

    //Le agrego un evento click a cada boton "agregar" de los productos en novedades
    botones_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });

    btn_carrito.onclick = mostrar_carrito;
    document.querySelector('#modal_carrito .modal-header button').onclick = limpiar_carrito;
});





