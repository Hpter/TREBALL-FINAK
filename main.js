// NAVEGACIÓN ACTIVA
const sections = document.querySelectorAll('.section')
const navLinks = document.querySelectorAll('.nav-list li a')

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
            })
        }
    })
}, { threshold: 0.3 })

sections.forEach(s => observer.observe(s))

// OPERADORES
function calcular() {
    const a = parseFloat(document.getElementById('opA').value)
    const b = parseFloat(document.getElementById('opB').value)
    const op = document.getElementById('opOp').value
    let res
    switch (op) {
        case '+': res = a + b; break
        case '-': res = a - b; break
        case '*': res = a * b; break
        case '/': res = b === 0 ? 'Error: división por cero' : a / b; break
        case '%': res = a % b; break
    }
    document.getElementById('opResult').textContent = `${a} ${op} ${b} = ${res}`
}

// CONDICIONALES
function verNota() {
    const n = parseFloat(document.getElementById('notaInput').value)
    let cal
    if (isNaN(n) || n < 0 || n > 10) {
        cal = 'Introduce un número entre 0 y 10'
    } else if (n >= 9) {
        cal = `Sobresaliente (${n})`
    } else if (n >= 7) {
        cal = `Notable (${n})`
    } else if (n >= 5) {
        cal = `Aprobado (${n})`
    } else {
        cal = `Suspenso (${n})`
    }
    document.getElementById('notaResult').textContent = cal
}

// BUCLES
function generarTabla() {
    const n = parseInt(document.getElementById('tablaNum').value) || 1
    let out = ''
    for (let i = 1; i <= 10; i++) {
        out += `${n} × ${String(i).padStart(2, ' ')} = ${String(n * i).padStart(3, ' ')}\n`
    }
    document.getElementById('tablaResult').textContent = out
}

// DOM
let domColorToggle = false
function domCambiarTexto() {
    const val = document.getElementById('domInput').value.trim()
    document.getElementById('domTexto').textContent = val || '(vacío)'
}
function domToggleColor() {
    domColorToggle = !domColorToggle
    document.getElementById('domTexto').style.color =
        domColorToggle ? 'var(--accent3)' : 'var(--accent2)'
}
function domAnadir() {
    const val = document.getElementById('domInput').value.trim()
    if (!val) return
    const p = document.createElement('p')
    p.textContent = '→ ' + val
    p.style.color = 'var(--muted)'
    p.style.marginTop = '6px'
    p.style.fontFamily = 'var(--mono)'
    p.style.fontSize = '13px'
    document.getElementById('domDemo').appendChild(p)
}
function domBorrarUltimo() {
    const demo = document.getElementById('domDemo')
    const ps = demo.querySelectorAll('p')
    if (ps.length > 0) ps[ps.length - 1].remove()
}

// EVENTOS
const log = document.getElementById('eventoLog')
function logEvento(tipo) {
    const hora = new Date().toLocaleTimeString('es-ES')
    log.textContent = `[${hora}] Evento: ${tipo}\n` + log.textContent
}
document.getElementById('eventoInput').addEventListener('input', e => {
    logEvento(`input → "${e.target.value}"`)
})

// FECHAS
function calcularDias() {
    const val = document.getElementById('fechaTarget').value
    const box = document.getElementById('fechaResult')
    if (!val) { box.textContent = 'Selecciona una fecha'; return }
    const target = new Date(val)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const diff = Math.ceil((target - hoy) / (1000 * 60 * 60 * 24))
    if (diff === 0) box.textContent = '¡Hoy es ese día!'
    else if (diff > 0) box.textContent = `Faltan ${diff} día${diff > 1 ? 's' : ''}`
    else box.textContent = `Hace ${Math.abs(diff)} día${Math.abs(diff) > 1 ? 's' : ''}`
}
