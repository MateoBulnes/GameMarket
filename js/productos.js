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

    buscar_filtros.onclick = busqueda_filtros;
    btn_buscar_precio.onclick = filtrar_por_precio;
    btn_limpiar.onclick = limpiar_filtros;

    categorias_filtros.forEach(function (categoria) {
        categoria.addEventListener('click', function(){
            filtrar_por_categoria(categoria.getAttribute('value'));
        })
    });

    plataformas_filtros.forEach(function (plataforma) {
        plataforma.addEventListener('click', function(){
            filtrar_por_plataforma(plataforma.getAttribute('value'));
        })
    });

    btn_carrito.onclick = mostrar_carrito;
    document.querySelector('#modal_carrito .modal-header button').onclick = limpiar_carrito;



});