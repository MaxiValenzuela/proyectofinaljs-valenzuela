// Selecciona el contenedor donde se agregarán las tarjetas de productos
const contenerdorCards = document.getElementById("p_container");

// Función para crear y agregar una tarjeta de producto al DOM
const crearCardProducto = ({ id, nombre, precio }) => {
    const nuevaPelicula = document.createElement("div");
    nuevaPelicula.className = "card_producto";
    
    // Inserta el contenido HTML en la tarjeta de producto
    nuevaPelicula.innerHTML = `
        <img src="../img/${id}.jpg">
        <h3 class="mi-clase">${nombre}</h3>
        <p class="mi-clase-parrafo">${precio}</p>
        <button>Comprar</button>
    `;
    
    // Selecciona el botón dentro de la tarjeta recién creada
    const boton = nuevaPelicula.querySelector("button");
    // Agrega un evento al botón para añadir el producto al carrito cuando se hace clic
    boton.addEventListener("click", () => {
        guardarAlCarrito({ id, nombre, precio });
        Toastify({
            text: `${nombre} ha sido agregado al carrito`,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "linear-gradient(to right, #3a03706b, #0e95aa)",
                fontSize:"1.2rem",
            },
            offset: {
                x: 15, 
                y: "2.5rem" 
              },
            onClick: function() {} 
        }).showToast();
    });
    
    // Agrega la tarjeta de producto al contenedor principal en el DOM
    contenerdorCards.appendChild(nuevaPelicula);
};

// Función para crear tarjetas de productos a partir de un array
const cards = (productos) => {
    // Limpia el contenedor antes de agregar nuevos productos
    contenerdorCards.innerHTML = ""; 
    productos.forEach(crearCardProducto); // Crea tarjetas para cada producto
};

let peliculas = [];

// Fetch para obtener los datos del archivo JSON
fetch("./js/peliculas.json")
    .then(response => {
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); 
    })
    .then(data => {
        peliculas = data; // Asigna los datos a la variable 'peliculas'
        cards(peliculas); // Llama a la función para crear las tarjetas de producto
    })
    .catch(error => {
        console.error("Hubo un problema con la solicitud Fetch:", error); 
    });
