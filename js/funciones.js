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

function buscar_juego_base(nombre) {
    return juegos.find(juego => juego.name == nombre);
}

function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    let cant_a_agregar = parseInt(document.querySelector(`#cant_${id.substring(4)}`).value);

    let nombre_prod = document.querySelector(`#nombre_${id.substring(4)}`).innerText;
    let precio_prod = formatear_precio(document.querySelector(`#precio_${id.substring(4)}`).innerText);
    let img_portada_prod;

    if (pagina_actual == 'index') {
        img_portada_prod = document.querySelector(`#novedades_${id.substring(4)} img`).src;
    }
    else if (pagina_actual == 'productos') {
        img_portada_prod = document.querySelector(`#producto_${id.substring(9)} img`).src;
    }

    document.querySelector('#cant_productos').innerText = cant_prod_carrito + cant_a_agregar;

    let producto_seleccionado = buscar_producto(nombre_prod);
    let juego_base = buscar_juego_base(nombre_prod);

    if (!producto_seleccionado) {
        const producto = new Producto(id.split("_")[2], nombre_prod, precio_prod, cant_a_agregar, img_portada_prod, juego_base.genres, juego_base.platforms);
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

function calcular_total_precio() {
    let total = 0;
    for (let i = 0; i < productos_carrito.length; i++) {
        total += productos_carrito[i].precio * productos_carrito[i].cantidad_agregada;
    }

    return total;
}

function calcular_total() {
    let total = calcular_total_precio();
    let container_resumen = document.createElement('div');
    container_resumen.id = 'subtotal_carrito';
    let html_resumen = '';
    productos_carrito.forEach(producto => {
        html_resumen += `
            <div class="row fila_resumen">
                <div class="col-md-6 nombre_resumen">${producto.nombre}</div>
                <div class="col-md-6 precio_resumen">$${producto.precio * producto.cantidad_agregada}</div>
            </div>
        `;
    });

    html_resumen += `
            <hr>
            <div class="row fila_resumen">
                <div class="col-md-6" id="titulo_total_resumen">TOTAL:</div>
                <div class="col-md-6 precio_total">$${total}</div>
            </div>
    `;

    container_resumen.innerHTML += html_resumen;
    document.querySelector('#modal_carrito #container_resumen').append(container_resumen);
}

function mostrar_carrito_vacio() {
    let container_prod_carrito = document.querySelector('#modal_carrito #container_carrito');
    let div = document.createElement('div');
    let comienzo_ruta_foto_carrito;

    if (pagina_actual == 'index') {
        comienzo_ruta_foto_carrito = './';
    }
    else if (pagina_actual == 'productos') {
        comienzo_ruta_foto_carrito = '../'
    }

    div.id = 'container_carrito_vacio';
    div.innerHTML = `
                <img src="${comienzo_ruta_foto_carrito}imgs/imgs_Iconos_y_Logos/empty_shopping_cart.png" id="img_carrito_vacio" alt="Carrito de compras vacío">
                <p>Empieza un carrito de compras!</p>
                <button class="btn btn-lg btn-primary" data-bs-dismiss="modal" onclick=limpiar_carrito()>Descubrir Juegos</button>
            `
    container_prod_carrito.append(div);

    document.querySelector('#modal_carrito #container_resumen p').hidden = false;
    document.querySelector('#modal_carrito #container_resumen').style['max-height'] = '30%';
    let total_resumen = document.querySelector('.fila_resumen');
    if (total_resumen) { total_resumen.parentNode.removeChild(total_resumen) }
}

function eliminar_producto(id) {
    let id_producto = id.split("_")[2]

    let fila_producto = document.querySelector('#fila_producto_' + id_producto);

    if (fila_producto) {
        productos_carrito = productos_carrito.filter(producto => producto.id !== id_producto);
        localStorage.setItem('carrito', JSON.stringify(productos_carrito));
        fila_producto.parentNode.removeChild(fila_producto);
        document.querySelector('#cant_productos').innerText = cantidad_carrito();

        let subtotal_carrito = document.querySelector('#subtotal_carrito');
        if (subtotal_carrito) {
            subtotal_carrito.parentNode.removeChild(subtotal_carrito);
        }
        calcular_total();

        if (productos_carrito.length <= 0) {
            mostrar_carrito_vacio();
        }
    }
}

function actualizar_cantidad(id, operador) {
    let prod_actual = productos_carrito.find(prod => prod.id == id);

    if (prod_actual) {
        if (operador == '+') {
            prod_actual.cantidad_agregada++;
        } else {
            if (prod_actual.cantidad_agregada > 1) {
                prod_actual.cantidad_agregada--;
            }
        }

        document.querySelector(`#cant_carrito_prod_${id}`).value = prod_actual.cantidad_agregada;
        document.querySelector('#cant_productos').innerText = cantidad_carrito();
        let subtotal_carrito = document.querySelector('#subtotal_carrito');
        if (subtotal_carrito) {
            subtotal_carrito.parentNode.removeChild(subtotal_carrito);
        }
        calcular_total();
    }
}

function mostrar_productos() {

    let html_tabla = `
            <table class="table" id="tabla_prod_carrito">
                <tbody>
            `;

    productos_carrito.forEach(producto => {
        html_tabla += `
                    <tr id="fila_producto_${producto.id}">
                        <td class="w-25 img_carrito"><img src="${producto.url_img_portada}"></td>
                        <td>
                        <div class="header_prod_carrito">
                                <span class="titulo_prod_carrito">${producto.nombre}</span>
                                <div class="subheader_prod_carrito">
                                    <button class="btn_eliminar_prod" id="prod_carrito_${producto.id}" onclick="eliminar_producto(id)">Eliminar</button>
                                    <div class="control_cantidad input-group">
                                        <button class="btn btn-secondary btn_restar_cant" onclick="actualizar_cantidad(${producto.id}, '-')">-</button>
                                        <input id="cant_carrito_prod_${producto.id}" class="form-control input_cant" value="${producto.cantidad_agregada}">
                                        <button class="btn btn-secondary btn_sumar_cant" onclick="actualizar_cantidad(${producto.id}, '+')">+</button>
                                    </div>
                                </div>
                        </div> 
                        </td>
                        <td class="align-middle"><span class="precio_carrito">$${producto.precio * producto.cantidad_agregada}</span></td>
                    </tr>
            `;
    });

    html_tabla += `
                </tbody>
            </table>
        `;

    contenedor_carrito.innerHTML += html_tabla;

}

function mostrar_carrito() {
    if (productos_carrito.length > 0) {
        document.querySelector('#modal_carrito #container_resumen p').hidden = true;
        document.querySelector('#modal_carrito #container_resumen').style['max-height'] = '70%';
        mostrar_productos();
        calcular_total();

    } else {
        mostrar_carrito_vacio()
    }
};

function limpiar_carrito() {
    let tabla_carrito = document.querySelector('#tabla_prod_carrito');
    let subtotal_carrito = document.querySelector('#subtotal_carrito');
    let carrito_vacio = document.querySelector('#container_carrito_vacio');

    if (tabla_carrito) {
        tabla_carrito.parentNode.removeChild(tabla_carrito);
    }

    if (subtotal_carrito) {
        subtotal_carrito.parentNode.removeChild(subtotal_carrito);
    }

    if (carrito_vacio) {
        carrito_vacio.parentNode.removeChild(carrito_vacio);
    }
}


//Pagina Productos
function cargar_productos() {
    pagina_actual = 'productos';
}


function filtrar_por_precio(precio_desde, precio_hasta) {
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



function busqueda_filtros() {
    let nombre_buscado = busqueda_ingresada.value.toLowerCase();
    let productos_filtrados = juegos.filter(juego => juego.name.toLowerCase().includes(nombre_buscado));

    let div_productos = document.getElementById("productos");

    while (div_productos.firstChild) {
        div_productos.removeChild(div_productos.firstChild);
    }
    console.log(productos_filtrados)

    let i = 0
    while (i < 8 && i < productos_filtrados.length) {
        crear_producto(productos_filtrados[i], i);
        i++;
    }

    let btns_agregar = document.querySelectorAll('.btn_agregar');

    btns_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });
}

function limpiar_filtros(){
    
}

function filtrar_por_categoria(categoria) {
    let productos_filtrados = juegos.filter(juego => juego.genres.some(genero => genero.slug == categoria));

    let div_productos = document.getElementById("productos");

    while (div_productos.firstChild) {
        div_productos.removeChild(div_productos.firstChild);
    }
    console.log(productos_filtrados)

    let i = 0
    while (i < 8 && i < productos_filtrados.length) {
        crear_producto(productos_filtrados[i], i);
        i++;
    }

    let btns_agregar = document.querySelectorAll('.btn_agregar');

    btns_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });


}

function filtrar_por_plataforma(plataforma) {
    let productos_filtrados = juegos.filter(juego => juego.platforms.some(p => p.platform.slug == plataforma));

    let div_productos = document.getElementById("productos");

    while (div_productos.firstChild) {
        div_productos.removeChild(div_productos.firstChild);
    }

    let i = 0
    while (i < 8 && i < productos_filtrados.length) {
        crear_producto(productos_filtrados[i], i);
        i++;
    }

    let btns_agregar = document.querySelectorAll('.btn_agregar');

    btns_agregar.forEach(function (btn) {
        btn.addEventListener('click', function () {
            let id = btn.id;

            agregar_producto(id);
        });
    });


}

function crear_producto(juego, n_actual) {
    let figure = document.createElement('figure');
    figure.classList.add('producto', 'card', 'text-center');
    figure.id = `producto_${n_actual}`;

    figure.innerHTML = `
                <img src="${juego.background_image}" alt="Imagen de portada ${juego.name}" class="card-img-top">
                <div class="infoProducto card-body"> 
                    <figcaption class="card-title" id="nombre_prod_${n_actual}">${juego.name}</figcaption> 
                    <p class="card-text" id="precio_prod_${n_actual}">$11.000</p>  
                    <div class="row">
                        <button class="btn btn-primary col-md-9 btn_agregar" id="btn_prod_${n_actual}">Agregar</button>
                        <input type="number" name="" id="cant_prod_${n_actual}" class="form-control" value="1" min="1">
                    </div>
                </div>`;

    document.querySelector('#productos').append(figure);
}

/*API*/
async function traer_juegos() {
    const resp = await fetch(url_api);

    const data = await resp.json();

    juegos = data.results;

    if (pagina_actual == 'index') {
        for (let i = 1; i <= 5; i++) {
            let juego_api = data.results[i];

            let figure = document.createElement('figure');
            figure.classList.add('producto', 'card', 'text-center');
            figure.id = `novedades_prod_${i}`;

            figure.innerHTML = `
                <img src="${juego_api.background_image}" alt="Imagen de portada ${juego_api.name}" class="card-img-top">
                <div class="infoProducto card-body"> 
                    <figcaption class="card-title" id="nombre_prod_${i}">${juego_api.name}</figcaption> 
                    <p class="card-text" id="precio_prod_${i}">$11.000</p>  
                    <div class="row">
                        <button class="btn btn-primary col-md-9 btn_agregar" id="btn_prod_${i}">Agregar</button>
                        <input type="number" name="" id="cant_prod_${i}" class="form-control" value="1" min="1">
                    </div>
                </div>`;

            document.querySelector('#novedades').append(figure);

        }
        botones_agregar = document.querySelectorAll('.btn_agregar');
    }
    else if (pagina_actual == 'productos') {
        for (let i = 1; i <= 8; i++) {
            let juego_api = data.results[i + 9];

            crear_producto(juego_api, i);
        }
        botones_agregar = document.querySelectorAll('.btn_agregar');
    }
} 