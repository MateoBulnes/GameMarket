//FUNCIONES DE PRODUCTOS
const obtener_carrito_storage = () => {
    if (localStorage.length > 0) {
        productos_carrito = JSON.parse(localStorage.getItem('carrito'));
        document.querySelector('#cant_productos').innerText = cantidad_carrito();
    }
};

function buscar_producto(nombre) {
    return productos_carrito.find(producto => producto.nombre === nombre);
}

function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    let cant_a_agregar = parseInt(document.querySelector(`#cant_${id.substring(4)}`).value);

    let nombre_prod = document.querySelector(`#nombre_${id.substring(4)}`).innerText;
    let precio_prod = formatear_precio(document.querySelector(`#precio_${id.substring(4)}`).innerText);
    let img_portada_prod = document.querySelector(`#novedades_${id.substring(4)} img`).src;
    img_portada_prod = img_portada_prod.substring(img_portada_prod.lastIndexOf('/') + 1);

    document.querySelector('#cant_productos').innerText = cant_prod_carrito + cant_a_agregar;

    let producto_seleccionado = buscar_producto(nombre_prod);

    if (!producto_seleccionado) {
        const producto = new Producto(id.split("_")[2], nombre_prod, precio_prod, cant_a_agregar, img_portada_prod);
        productos_carrito.push(producto);
    } else {
        producto_seleccionado.cantidad_agregada += cant_a_agregar;
    }

    localStorage.setItem('carrito', JSON.stringify(productos_carrito));
}

function formatear_precio(precio_sin_formato) {
    let nuevo_precio = precio_sin_formato.replace("$", "").trim();
    return parseInt(nuevo_precio.replace(".", ""));
}

function aplicar_descuento(total_sin_desc) {
    return total_sin_desc * 0.7;
}

function cantidad_carrito() {
    let cantidad_carrito = 0;

    for (let i = 0; i < productos_carrito.length; i++) {
        cantidad_carrito += productos_carrito[i].cantidad_agregada;
    }

    return cantidad_carrito;
}

function calcular_total() {
    let cant_prod_carrito = cantidad_carrito();

    if (cant_prod_carrito == 0) {
        document.querySelector('#titulo_modal_alerta').innerHTML = 'Atención';
        document.querySelector('#texto_alerta').textContent = 'No hay ningun producto en el carrito';
        modal_alerta.show();
    } else {
        let total = 0;
        for (let i = 0; i < productos_carrito.length; i++) {
            total += productos_carrito[i].precio * productos_carrito[i].cantidad_agregada;
        }

        let aviso_descuento = "";

        if (cant_prod_carrito >= 3) {
            total = aplicar_descuento(total);
            aviso_descuento += " (Se le aplico un 30% de descuento por comprar más de 2 juegos)";
        }

        document.querySelector('#titulo_modal_alerta').innerHTML = 'Exito';
        document.querySelector('#texto_alerta').textContent = `El total en su carrito es de: $${total}. ${aviso_descuento}`;
        modal_alerta.show();
    }
}

function eliminar_producto(id) {
    let id_producto = id.split("_")[2]

    let fila_producto = document.querySelector('#fila_producto_' + id_producto);

    if (fila_producto) {
        productos_carrito = productos_carrito.filter(producto => producto.id !== id_producto);
        localStorage.setItem('carrito', JSON.stringify(productos_carrito));
        fila_producto.parentNode.removeChild(fila_producto);
        document.querySelector('#cant_productos').innerText = cantidad_carrito();
    }
}

function mostrar_carrito() {
    let html_tabla = `
        <table class="table">
            <tbody>
        `;

    productos_carrito.forEach(producto => {
        html_tabla += `
                <tr id="fila_producto_${producto.id}">
                    <td class="w-25 img_carrito"><img src="imgs/Imgs_Productos/${producto.url_img_portada}"></td>
                    <td class="align-middle">${producto.nombre}</td>
                    <td class="align-middle">${producto.precio}</td>
                    <td class="align-middle">${producto.cantidad_agregada}</td>
                    <td class="align-middle"><button class="btn_eliminar_prod" id="prod_carrito_${producto.id}" onclick="eliminar_producto(id)">Eliminar</button></td>
                </tr>
        `;
    });

    html_tabla += `
            </tbody>
        </table>
    `;

    contenedor_carrito.innerHTML += html_tabla;
};

//FILTRADO DE PRODUCTOS
function llenar_productos_disponibles() {
    let nombre_prod;
    let precio_prod;
    let url_img;

    for (let i = 1; i <= 5; i++) {
        nombre_prod = document.getElementById('nombre_prod_' + i).innerText;
        precio_prod = formatear_precio(document.getElementById('precio_prod_' + i).innerText);
        url_img = document.querySelector(`#novedades_prod_${i} img`).src;
        url_img = url_img.substring(url_img.lastIndexOf('/') + 1);

        const prod = new Producto(i, nombre_prod, precio_prod, 0, url_img);
        productos_disponibles.push(prod);
    }
};

function filtrar_por_precio(precio_desde, precio_hasta) {
    console.log(precio_desde);
    console.log(precio_hasta);
    return productos_disponibles.filter(producto => {
        if (precio_desde && precio_hasta) {
            // Filtrar si ambos límites están definidos
            return producto.precio >= precio_desde && producto.precio <= precio_hasta;
        } else if (precio_desde) {
            // Filtrar si solo hay precio_desde definido
            return producto.precio >= precio_desde;
        } else if (precio_hasta) {
            // Filtrar si solo hay precio_hasta definido
            return producto.precio <= precio_hasta;
        }
        // Si no hay límites definidos, no aplicar filtro de precios
        return true;
    });
}


function filtrar_por_nombre(nombre, productos) {
    return productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(nombre.toLowerCase());
    });
}

function mostrar_filtrados(productos) {

    let container_filtros = document.querySelector('#modal_filtros .modal-body');

    let html_tabla = `
        <h3 id="titulo_resultados_filtros">Resultados</h3>
        <table class="table" id="tabla_resultados_filtros">
            <tbody>
        `;

    productos.forEach(producto => {
        html_tabla += `
                <tr>
                    <td class="w-25 img_carrito"><img src="imgs/Imgs_Productos/${producto.url_img_portada}"></td>
                    <td class="align-middle">${producto.nombre}</td>
                    <td class="align-middle">${producto.precio}</td>
                </tr>
        `;
    });

    html_tabla += `
            </tbody>
        </table>
    `;

    container_filtros.innerHTML += html_tabla;
}

function definir_categoria() {
    let precio_desde = document.querySelector('#precio_desde').value;
    let precio_hasta = document.querySelector('#precio_hasta').value;
    let nombre = document.querySelector('#nombre_prod_filtro').value;

    if (precio_desde && precio_hasta && nombre) {
        return 'PRECIO Y NOMBRE';
    }
    else if (!nombre && (precio_desde || precio_hasta)) {
        return 'PRECIO';
    }
    else if (nombre && !precio_desde && !precio_hasta) {
        return 'NOMBRE';
    }
    else if (!nombre && !precio_desde && !precio_hasta) {
        return 'NINGUNO';
    }
    else { return 'PRECIO Y NOMBRE' };
}

const ocultar_alerta = () => {
    let alerta_filtros = document.querySelector('#modal_filtros .alerta');
    alerta_filtros.hidden = true;
};

function filtrar_productos() {
    let categoria = definir_categoria();
    let productos_filtrados = [];
    let precio_desde = document.querySelector('#precio_desde').value;
    let precio_hasta = document.querySelector('#precio_hasta').value;
    let nombre_producto = document.querySelector('#nombre_prod_filtro').value;

    if (categoria == 'NINGUNO') {
        let alerta_filtros = document.querySelector('#modal_filtros .alerta');
        alerta_filtros.hidden = false;
    }
    else if (categoria == 'PRECIO') {
        productos_filtrados = filtrar_por_precio(precio_desde, precio_hasta);
    }
    else if (categoria == 'NOMBRE') {
        productos_filtrados = filtrar_por_nombre(nombre_producto, productos_disponibles);
    } else {
        productos_filtrados = filtrar_por_precio(precio_desde, precio_hasta);
        productos_filtrados = filtrar_por_nombre(nombre_producto, productos_filtrados)
    }


    if (productos_filtrados.length <= 0 && categoria != 'NINGUNO') {
        let container_filtros = document.querySelector('#modal_filtros .modal-body');
        container_filtros.innerHTML += `<div id="cartel_sin_resultados">No se encontraron resultados para los filtros ingresados</div>`;
    } else {
        if (document.querySelector('#cartel_sin_resultados')) {
            document.querySelector('#cartel_sin_resultados').remove();
        }

        if (categoria != 'NINGUNO') { mostrar_filtrados(productos_filtrados); }
    }
}

function limpiar_filtros() {
    let tabla_resultados = document.querySelector('#tabla_resultados_filtros');
    let titulo_resultados = document.querySelector('#titulo_resultados_filtros');
    let cartel_sin_resultados = document.querySelector('#cartel_sin_resultados');

    if (tabla_resultados) {
        tabla_resultados.parentNode.removeChild(tabla_resultados);
    }
    if (titulo_resultados) {
        titulo_resultados.parentNode.removeChild(titulo_resultados);
    }
    if (cartel_sin_resultados) {
        cartel_sin_resultados.parentNode.removeChild(cartel_sin_resultados);
    }
}