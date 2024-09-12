
function guardarAlCarrito(productos) {
    const memoria = JSON.parse(localStorage.getItem("peliculas")) || []; // Inicializa memoria como un array vacío si no hay datos
    console.log(memoria);
    
    let cuenta = 0;
    const productoIndex = memoria.findIndex(pelicula => pelicula.id === productos.id); 
    if (productoIndex === -1) {
        
        const nuevoProducto = obtenerNewProduct(productos);
        memoria.push(nuevoProducto); 
        cuenta = 1; 
    } else {
        
        memoria[productoIndex].cantidad++;
        cuenta = memoria[productoIndex].cantidad; 
    }

    localStorage.setItem("peliculas", JSON.stringify(memoria)); 
    actualizarCarrito(); 
    return cuenta; 
}

function sacarAlCarrito(productos) {
    const memoria = JSON.parse(localStorage.getItem("peliculas")) || [];
    const productoIndex = memoria.findIndex(pelicula => pelicula.id === productos.id); 
    if (productoIndex !== -1) {
        if (memoria[productoIndex].cantidad === 1) {
            memoria.splice(productoIndex, 1); 
        } else {
            memoria[productoIndex].cantidad--; 
        }
    }
    localStorage.setItem("peliculas", JSON.stringify(memoria)); 
    actualizarCarrito(); 
}

function obtenerNewProduct(productos) {
    return { ...productos, cantidad: 1 }; 
}


const contadorElement = document.getElementById("contador");

function actualizarCarrito() {
    const memoria = JSON.parse(localStorage.getItem("peliculas")) || [];
    if(memoria && memoria.length >0){
    const totalCantidad = memoria.reduce((acum, current) => acum + current.cantidad, 0); // Suma las cantidades
    contadorElement.textContent = totalCantidad; 
} else{
    contadorElement.innerText = 0;
}
}

actualizarCarrito();

//buscador 
document.addEventListener('keyup', e => {
    if(e.target.matches('#buscador')){
        document.querySelectorAll('.card_producto').forEach(nombre =>{
            nombre.textContent.toLowerCase(). includes(e.target.value)
            ? nombre.classList.remove('filtro')
            : nombre.classList.add('filtro');
        })
    }
})
