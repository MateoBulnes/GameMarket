var productos_en_carrito = {};



function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    document.getElementById('cant_productos').innerText = cant_prod_carrito + 1;
    productos_en_carrito[id] = formatear_precio(document.getElementById('precio_' + id.split("_")[1]).innerText);
}

function formatear_precio(precio_sin_formato) {
    let nuevo_precio = precio_sin_formato.replace("$", "").trim();
    return parseInt(nuevo_precio.replace(".", ""));
}

function calcular_total() {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    var claves = Object.keys(productos_en_carrito);
    let total = 0;
    for (let i = 0; i < cant_prod_carrito; i++) {
        total += productos_en_carrito[claves[i]];
    }

    let aviso_descuento = "";

    if (cant_prod_carrito >= 3) {
        total = aplicar_descuento(total);
        aviso_descuento += " (Se le aplico un 30% de descuento por comprar más de 2 juegos)";
    }

    alert("El total en su carrito es de: $" + total + aviso_descuento);
}

function aplicar_descuento(total_sin_desc) {
    return total_sin_desc * 0.7;
}