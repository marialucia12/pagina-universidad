// variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito =[];

cargarEventListeners();
function cargarEventListeners(){
    // cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click' , agregarCurso);

    // Eliminar curso del carrito 
    carrito.addEventListener('click' , eliminarCurso);

    // muestra cursos del Local Storage

    document.addEventListener('DOMcontentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem ('carrito')) || [];

        carritoHTML();
    } )

    // vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo

        limpiarHTML(); // eliminamos todo el html 
    })
}

// funciones 
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar curso del carrito 
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito con el dat-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); // iterar sobre el carrito y mostrar su HTML
    } 
}


// lee el contenido del HTML al que le dimos click y extrae informacion
function leerDatosCurso(curso) {
    // console.log(curso);

    // crear un objeto con el contenido delcurso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src ,
        titulo: curso.querySelector('h4').textContent ,
        precio: curso.querySelector('.precio span').textContent ,
        id: curso.querySelector('a').getAttribute('data-id') ,
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        // actualizamos la cantidad 
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {

    // limpiar el HTML
    limpiarHTML();

    // recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td> <img src="${imagen}" width="100">
    </td> 
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        `;



        // agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    // agregar carriro al localStorage

    sincronizarStorage();

} 

function sincronizarStorage() {
    localStorage.setItem('carrito' JSON.stringify(articulosCarrito));
}

function limpiarHTML (){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
