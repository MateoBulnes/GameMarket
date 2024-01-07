var productos_carrito = [];

function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    let cant_a_agregar = Number(prompt("Ingrese la cantidad de unidades de este juego que desea agregar"));

    document.getElementById('cant_productos').innerText = cant_prod_carrito + cant_a_agregar;
    let producto = construir_producto(id, cant_a_agregar);
    productos_carrito.push(producto);
}

function construir_producto(id_producto, cantidad_prod) {
    let nombre_prod = document.getElementById('nombre_prod_' + id_producto.split("_")[1]).innerText;
    let precio_prod = formatear_precio(document.getElementById('precio_' + id_producto.split("_")[1]).innerText);

    return { nombre: nombre_prod, precio: precio_prod, cantidad: cantidad_prod };
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
        console.log(productos_carrito[i].cantidad)
        cantidad_carrito += productos_carrito[i].cantidad;
    }

    return cantidad_carrito;
}

function calcular_total() {
    let cant_prod_carrito = cantidad_carrito();

    if (cant_prod_carrito == 0) {
        alert("No tiene productos seleccionados en su carrito");
    } else {
        let total = 0;
        for (let i = 0; i < productos_carrito.length; i++) {
            total += productos_carrito[i].precio * productos_carrito[i].cantidad;
        }

        let aviso_descuento = "";

        if (cant_prod_carrito >= 3) {
            total = aplicar_descuento(total);
            aviso_descuento += " (Se le aplico un 30% de descuento por comprar más de 2 juegos)";
        }

        alert("El total en su carrito es de: $" + total + aviso_descuento);
    }
}

function ver_carrito() {
    let subtotal = 0;
    console.log("Productos en el carrito: ");
    for (let i = 0; i < productos_carrito.length; i++) {
        console.log(`${i + 1}: ${productos_carrito[i].nombre}, $${productos_carrito[i].precio} x ${productos_carrito[i].cantidad} `);
        subtotal += productos_carrito[i].precio * productos_carrito[i].cantidad;
    }
    console.log(`Subtotal: $${subtotal}`);
}
