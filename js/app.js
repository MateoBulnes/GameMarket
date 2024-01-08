var productos_carrito = [];
var productos_disponibles = [];

class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad_agregada = cantidad;
    }
}

//MANEJO DE PRODUCTOS CON EL CARRITO
function buscar_producto(nombre) {
    return productos_carrito.find(producto => producto.nombre === nombre);
}

function agregar_producto(id) {
    let cant_prod_carrito = parseInt(document.getElementById('cant_productos').innerText);
    let cant_a_agregar = Number(prompt("Ingrese la cantidad de unidades de este juego que desea agregar"));

    while(isNaN(cant_a_agregar) || cant_a_agregar == ''){
        cant_a_agregar = Number(prompt('El valor ingresado no es numérico o esta vacío, intentelo nuevamente'));
    }

    let nombre_prod = document.getElementById('nombre_prod_' + id.split("_")[1]).innerText;
    let precio_prod = formatear_precio(document.getElementById('precio_' + id.split("_")[1]).innerText);

    document.getElementById('cant_productos').innerText = cant_prod_carrito + cant_a_agregar;

    let producto_seleccionado = buscar_producto(nombre_prod);

    if (!producto_seleccionado) {
        const producto = new Producto(nombre_prod, precio_prod, cant_a_agregar);
        productos_carrito.push(producto);
    } else {
        producto_seleccionado.cantidad_agregada += cant_a_agregar;
    }
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
        alert("No tiene productos seleccionados en su carrito");
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

        alert("El total en su carrito es de: $" + total + aviso_descuento);
    }
}

function ver_carrito() {
    let subtotal = 0;
    console.log("Productos en el carrito: ");
    for (let i = 0; i < productos_carrito.length; i++) {
        console.log(`${i + 1}: ${productos_carrito[i].nombre}, $${productos_carrito[i].precio} x ${productos_carrito[i].cantidad_agregada} `);
        subtotal += productos_carrito[i].precio * productos_carrito[i].cantidad_agregada;
    }
    console.log(`Subtotal: $${subtotal}`);
};

//FILTRADO DE PRODUCTOS
function llenar_productos_disponibles() {
    let nombre_prod;
    let precio_prod;

    for (let i = 1; i <= 5; i++) {
        nombre_prod = document.getElementById('nombre_prod_' + i).innerText;
        precio_prod = formatear_precio(document.getElementById('precio_' + i).innerText);
        const prod = new Producto(nombre_prod, precio_prod, 0);
        productos_disponibles.push(prod);
    }
};

function filtrar_por_precio(precio, operador) {
    return productos_disponibles.filter(producto => {
        return operador === '<' ? producto.precio < precio : producto.precio > precio;
    });
}


function filtrar_por_nombre(nombre) {
    return productos_disponibles.filter(producto => {
        return producto.nombre.toLowerCase().includes(nombre.toLowerCase());
    });
}

function mostrar_filtrados(productos) {
    console.log("Productos Filtrados: ");
    for (let i = 0; i < productos.length; i++) {
        console.log(`${i + 1}: ${productos[i].nombre}, $${productos[i].precio}`);
    }
}

function filtrar_productos() {
    let categoria = prompt("Ingrese alguna de las siguientes categorías para filtrar los productos: PRECIO o NOMBRE").toUpperCase();

    while (categoria != 'PRECIO' && categoria != 'NOMBRE') {
        categoria = prompt('La categoría ingresada no corresponde con alguna de las disponibles. Vuelva a ingresar una de las siguientes opciones: PRECIO o NOMBRE').toUpperCase();
    }

    let productos_filtrados = [];

    if (categoria == 'PRECIO') {
        let precio_limite = Number(prompt('Ingrese el precio límite por el que desea filtrar'));
        while (isNaN(precio_limite) || precio_limite == '') {
            precio_limite = Number(prompt('Solo puede ingresar valores numéricos para este campo, ingrese el precio nuevamente'));
        }

        let signo_desigual = prompt('Ingrese "<" si desea buscar precios menores al indicado, o ">" si desea buscar precios mayores al indicado');
        while (signo_desigual != '<' && signo_desigual != '>') {
            signo_desigual = prompt('El signo ingresado no corresponde con "<" ni con ">", intentelo nuevamente');
        }

        productos_filtrados = filtrar_por_precio(precio_limite, signo_desigual);
    } else {
        let nombre_producto = prompt('Ingrese el nombre del producto a buscar');
        while (nombre_producto == '') {
            nombre_producto = prompt('No puede ingresar un nombre vacío, intentelo nuevamente');
        }

        productos_filtrados = filtrar_por_nombre(nombre_producto);
    }

    if (productos_filtrados.length <= 0) {
        alert('No se han encontrado productos para los filtros ingresados');
    } else {
        mostrar_filtrados(productos_filtrados);
    }
}

llenar_productos_disponibles();
