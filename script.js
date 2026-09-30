// Array donde se guardarán los contactos
let contactos = [];

// Obtener elementos del HTML
const nombreInput = document.getElementById("nombre");
const telefonoInput = document.getElementById("telefono");
const btnAgregar = document.getElementById("btnAgregar");

const buscarInput = document.getElementById("buscar");

const listaContactos = document.getElementById("listaContactos");
const mensajeVacio = document.getElementById("mensajeVacio");

const contador = document.getElementById("contador");


// AGREGAR CONTACTO
btnAgregar.addEventListener("click", function () {

    const nombre = nombreInput.value.trim();
    const telefono = telefonoInput.value.trim();

    // No permitir campos vacíos
    if (nombre === "" || telefono === "") {
        return;
    }

    // Crear objeto contacto
    const contacto = {
        nombre: nombre,
        telefono: telefono
    };

    // Agregar al array
    contactos.push(contacto);

    // Limpiar inputs
    nombreInput.value = "";
    telefonoInput.value = "";

    // Actualizar pantalla
    mostrarContactos();
    actualizarContador();
});


// MOSTRAR CONTACTOS
function mostrarContactos() {

    const textoBusqueda = buscarInput.value.toLowerCase().trim();

    // Limpiar lista
    listaContactos.innerHTML = "";

    // Filtrar contactos
    const contactosFiltrados = contactos.filter(function (contacto) {

        return contacto.nombre
            .toLowerCase()
            .includes(textoBusqueda);

    });

    // Mostrar mensaje cuando no existen contactos
    if (contactosFiltrados.length === 0) {

        if (contactos.length === 0) {
            mensajeVacio.textContent =
                "Todavía no agregaste contactos.";
        } else {
            mensajeVacio.textContent =
                "No se encontraron contactos.";
        }

        mensajeVacio.style.display = "block";

    } else {

        mensajeVacio.style.display = "none";

        contactosFiltrados.forEach(function (contacto) {

            const li = document.createElement("li");
            li.classList.add("contacto");

            const info = document.createElement("div");
            info.classList.add("info-contacto");

            const nombre = document.createElement("span");
            nombre.classList.add("nombre-contacto");
            nombre.textContent = contacto.nombre;

            const telefono = document.createElement("span");
            telefono.classList.add("telefono-contacto");
            telefono.textContent = contacto.telefono;

            const botonEliminar = document.createElement("button");
            botonEliminar.classList.add("btnEliminar");
            botonEliminar.textContent = "Eliminar";

            // Event listener para eliminar
            botonEliminar.addEventListener("click", function () {

                const posicion = contactos.indexOf(contacto);

                if (posicion !== -1) {
                    contactos.splice(posicion, 1);
                }

                mostrarContactos();
                actualizarContador();
            });

            info.appendChild(nombre);
            info.appendChild(telefono);

            li.appendChild(info);
            li.appendChild(botonEliminar);

            listaContactos.appendChild(li);
        });
    }
}


// CONTADOR
function actualizarContador() {

    contador.textContent = contactos.length;
}


// BUSCADOR EN TIEMPO REAL
buscarInput.addEventListener("input", function () {

    mostrarContactos();

});


// Mostrar estado inicial
mostrarContactos();
actualizarContador();