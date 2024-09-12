// Elementos del DOM
const contenerdorCards = document.getElementById("p_container");
const unidadElement = document.getElementById("unidad");
const precioElement = document.getElementById("precio");
const vacioElement = document.getElementById("vacio");
const totalElement = document.getElementById("total");
const botonReiniciar = document.getElementById("reiniciar");
const botonComprar = document.getElementById("comprar");


function cards() {
    contenerdorCards.innerHTML = ""; 
    const productos = JSON.parse(localStorage.getItem("peliculas")) || []; 

    console.log(productos);
    if (productos.length > 0) {
        productos.forEach(producto => crearCard(producto)); 
    }
}

function crearCard(producto) {
    const nuevaPelicula = document.createElement("div");
    nuevaPelicula.classList.add("card_producto");
    nuevaPelicula.innerHTML = `
        <img src="../img/${producto.id}.jpg">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}</p>
        <div class="div-cantidad">
            <button>-</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button>+</button>
        </div>
    `;
    contenerdorCards.appendChild(nuevaPelicula); 

    agregarEventosBotones(nuevaPelicula, producto);
    
    nuevaPelicula.querySelector("h3").classList.add("mi-clase");
    nuevaPelicula.querySelector("p").classList.add("mi-clase-parrafo");
}


function agregarEventosBotones(card, producto) {
    const [botonMenos, botonMas] = card.getElementsByTagName("button"); 

    botonMas.addEventListener("click", (e) => { 
        const contadorDeElement = e.target.parentElement.querySelector("span");
        contadorDeElement.innerText = guardarAlCarrito(producto); 
        actualizarTotal(); 
    });

    botonMenos.addEventListener("click", () => {
        sacarAlCarrito(producto); 
        cards(); 
        actualizarTotal(); 
    });
}


cards();
actualizarTotal();


function actualizarTotal() {
    const productos = JSON.parse(localStorage.getItem("peliculas")) || [];
    let unidad = 0;
    let precio = 0;

    if (productos.length > 0) {
        productos.forEach(producto => {
            unidad += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
    }
    unidadElement.innerText = unidad; 
    precioElement.innerText = precio; 
    carroVacio(); 
}


function carroVacio() {
    const productos = JSON.parse(localStorage.getItem("peliculas")) || [];
    const tieneProductos = productos.length > 0; 

    vacioElement.classList.toggle("esconder", tieneProductos); 
    totalElement.classList.toggle("esconder", !tieneProductos); 
}


carroVacio();


botonReiniciar.addEventListener("click",vaciarCarrito)
function vaciarCarrito(){
    localStorage.removeItem("peliculas");
    actualizarTotal();
    cards();
}

botonComprar.addEventListener("click",finalizarCompra)
function finalizarCompra(){
    Swal.fire("Tu compra se realizo con exito!");
    localStorage.removeItem("peliculas");
    actualizarTotal();
    cards();
}

// botonReiniciar.addEventListener("click", () => {
//     Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Aun no contamos con esa opción! Estamos trabajando para que pronto esté disponible",
//         footer: '<a href="#">Lo lamentamos</a>',
//         customClass: {
//             text:'mytext',
//             icon:'my-icon',
//             title: 'my-alert-title', 
//             html: 'my-alert-text', 
//             footer: 'my-alert-footer', 
//             confirmButton: 'my-alert-button' 
//         }
//     });
// });
