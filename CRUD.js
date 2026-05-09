// VARIABLES GLOBALES //
// Array donde se guardan todos los préstamos
let listaPrestamos = []

// Guarda el índice del préstamo que se está editando (null = modo creación)
let indiceEdicion = null

// REFERENCIAS AL DOM //
const campoNombreAlumno = document.getElementById('nombreAlumno')
const campoMaterial     = document.getElementById('material')
const checkboxDevuelto  = document.getElementById('devuelto')
const botonGuardar      = document.getElementById('botonGuardar')
const cuerpoTabla       = document.getElementById('cuerpoTabla')

// ALERTA VISUAL //
// Muestra un mensaje temporal en la interfaz en lugar de usar alert()
function showAlert(msg, tipo = 'warn') {
    const a = document.getElementById('alertFormulario')
    a.textContent = msg
    a.className = `alert alert-${tipo} show`
    setTimeout(() => a.classList.remove('show'), 3000)
}

// CREAR / ACTUALIZAR //
// Se llama al pulsar el botón "Añadir préstamo" o "Guardar cambios"
function guardarPrestamo() {
    const nombre       = campoNombreAlumno.value.trim()
    const material     = campoMaterial.value
    const turnoMarcado = document.querySelector('input[name="turno"]:checked')
    const devuelto     = checkboxDevuelto.checked

    // Validación: todos los campos son obligatorios
    if (nombre === '' || material === '' || !turnoMarcado) {
        showAlert('Debes completar todos los campos', 'warn')
        return
    }

    const turno = turnoMarcado.value

    const nuevoPrestamo = {
        nombre,
        material,
        turno,
        devuelto
    }

    if (indiceEdicion === null) {
        // Modo creación: añadir al final del array
        listaPrestamos.push(nuevoPrestamo)
        showAlert('Prestamo anadido correctamente', 'ok')
    } else {
        // Modo edición: sustituir el elemento en la posición guardada
        listaPrestamos[indiceEdicion] = nuevoPrestamo
        indiceEdicion = null

        // Restaurar el botón a su estado inicial
        botonGuardar.textContent = 'Anadir prestamo'
        botonGuardar.style.borderColor = ''
        botonGuardar.style.color = ''
        showAlert('Prestamo actualizado correctamente', 'ok')
    }

    limpiarFormulario()
    mostrarPrestamos()
}

//  LEER //
// Recorre el array y construye las filas de la tabla
function mostrarPrestamos() {
    if (listaPrestamos.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted)">No hay prestamos registrados</td></tr>'
        return
    }

    // Construimos todo el HTML primero y lo asignamos una sola vez (mas eficiente)
    let html = ''
    listaPrestamos.forEach((p, i) => {
        html += `
        <tr>
            <td style="color:var(--text)">${p.nombre}</td>
            <td>${p.material}</td>
            <td><span class="chip">${p.turno}</span></td>
            <td><span class="chip ${p.devuelto ? 'blue' : 'red'}">${p.devuelto ? 'Si' : 'No'}</span></td>
            <td style="display:flex;gap:6px;flex-wrap:wrap">
                <button class="btn-warn btn-sm" onclick="editarPrestamo(${i})">Editar</button>
                <button class="btn-danger btn-sm" onclick="borrarPrestamo(${i})">Borrar</button>
            </td>
        </tr>`
    })
    cuerpoTabla.innerHTML = html
}

//  BORRAR //
// Elimina un elemento del array por su posición y actualiza la tabla
function borrarPrestamo(indice) {
    listaPrestamos.splice(indice, 1)
    mostrarPrestamos()
    showAlert('Prestamo eliminado', 'warn')
}

// EDITAR //
// Rellena el formulario con los datos del préstamo seleccionado
function editarPrestamo(indice) {
    const p = listaPrestamos[indice]

    campoNombreAlumno.value  = p.nombre
    campoMaterial.value      = p.material
    checkboxDevuelto.checked = p.devuelto

    // Marca el radio button que corresponde al turno guardado
    const radio = document.querySelector(`input[name="turno"][value="${p.turno}"]`)
    if (radio) radio.checked = true

    // Guardamos el índice para saber qué posición actualizar al guardar
    indiceEdicion = indice

    // Cambio visual del botón para indicar que estamos en modo edición
    botonGuardar.textContent   = 'Guardar cambios'
    botonGuardar.style.borderColor = '#ffaa44'
    botonGuardar.style.color       = '#ffaa44'
}

// LIMPIAR FORMULARIO //
function limpiarFormulario() {
    campoNombreAlumno.value  = ''
    campoMaterial.value      = ''
    checkboxDevuelto.checked = false
    document.querySelectorAll('input[name="turno"]').forEach(r => {
        r.checked = false
    })
}