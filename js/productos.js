document.addEventListener('DOMContentLoaded', async function () {
    pagina_actual = 'productos';
    await traer_juegos();

    obtener_carrito_storage();

    botones_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });

    btn_carrito.onclick = mostrar_carrito;
    document.querySelector('#modal_carrito .modal-header button').onclick = limpiar_carrito;

});