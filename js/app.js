var productos_en_carrito = {};

function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    let cant_a_agregar = Number(prompt("Ingrese la cantidad de unidades de este juego que desea agregar"));
    let precio_producto = formatear_precio(document.getElementById('precio_' + id.split("_")[1]).innerText);

    document.getElementById('cant_productos').innerText = cant_prod_carrito + cant_a_agregar;
    productos_en_carrito[id] = precio_producto * cant_a_agregar;
}

function formatear_precio(precio_sin_formato) {
    let nuevo_precio = precio_sin_formato.replace("$", "").trim();
    return parseInt(nuevo_precio.replace(".", ""));
}

function aplicar_descuento(total_sin_desc) {
    return total_sin_desc * 0.7;
}

function calcular_total() {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    if (cant_prod_carrito == 0) {
        alert("No tiene productos seleccionados en su carrito");
    } else {
        //Obtengo las claves de los productos para poder iterar sobre el diccionario
        let claves = Object.keys(productos_en_carrito);
        let total = 0;
        for (let i = 0; i < claves.length; i++) {
            total += productos_en_carrito[claves[i]];
        }

        let aviso_descuento = "";

        if (cant_prod_carrito >= 3) {
            total = aplicar_descuento(total);
            aviso_descuento += " (Se le aplico un 30% de descuento por comprar más de 2 juegos)";
        }

        alert("El total en su carrito es de: $" + total + aviso_descuento);
    }
}
