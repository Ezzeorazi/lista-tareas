const input = document.getElementById('ingresar-tarea');
const boton = document.querySelector('button');
const listaDeTarea = document.getElementById('lista-de-tareas');

// Cargar tareas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', cargarTareas);

function agregarTarea() {
    if (input.value) {
        let tareaNueva = document.createElement('div');
        tareaNueva.classList.add('tarea');

        let texto = document.createElement('p');
        texto.innerText = input.value;
        tareaNueva.appendChild(texto);

        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNueva.appendChild(iconos);

        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);

        listaDeTarea.appendChild(tareaNueva);

        // Guardar la tarea en Local Storage
        guardarTarea(input.value);
        input.value = ''; // Limpiar el input
    } else {
        alert('Por Favor Ingresa una Tarea');
    }
}

function completarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.classList.toggle('completada');
    // Actualizar el estado en Local Storage
    actualizarTareasEnLocalStorage();
}

function eliminarTarea(e) {
    let tarea = e.target.parentNode.parentNode;
    tarea.remove();
    // Actualizar el almacenamiento después de eliminar
    actualizarTareasEnLocalStorage();
}

function guardarTarea(tarea) {
    const tareas = obtenerTareasDesdeLocalStorage();
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareas = obtenerTareasDesdeLocalStorage();
    tareas.forEach(tareaTexto => {
        let tareaNueva = document.createElement('div');
        tareaNueva.classList.add('tarea');

        let texto = document.createElement('p');
        texto.innerText = tareaTexto;
        tareaNueva.appendChild(texto);

        let iconos = document.createElement('div');
        iconos.classList.add('iconos');
        tareaNueva.appendChild(iconos);

        let completar = document.createElement('i');
        completar.classList.add('bi', 'bi-check-circle-fill', 'icono-completar');
        completar.addEventListener('click', completarTarea);

        let eliminar = document.createElement('i');
        eliminar.classList.add('bi', 'bi-trash3-fill', 'icono-eliminar');
        eliminar.addEventListener('click', eliminarTarea);

        iconos.append(completar, eliminar);
        listaDeTarea.appendChild(tareaNueva);
    });
}

function obtenerTareasDesdeLocalStorage() {
    const tareasJSON = localStorage.getItem('tareas');
    return tareasJSON ? JSON.parse(tareasJSON) : [];
}

function actualizarTareasEnLocalStorage() {
    const tareas = Array.from(listaDeTarea.children).map(tarea => tarea.querySelector('p').innerText);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

boton.addEventListener('click', agregarTarea);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});
