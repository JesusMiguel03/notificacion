const notificacionesAlmacenadas = []
document.querySelector(".badge").innerHTML = localStorage.length
document.querySelector(".position-absolute").innerHTML = localStorage.length
const actualizarNotificaciones = () => {
    for (let i = 0, len = localStorage.length; i < len; ++i) {
        notificacionesAlmacenadas.push(
            localStorage.getItem(localStorage.key(i))
        )
    }
}
actualizarNotificaciones()

const container = document.getElementById("contenido")

notificacionesAlmacenadas.forEach(notificacion => {
    const titulo = JSON.parse(notificacion).titulo
    const contenido = JSON.parse(notificacion).contenido
    const img = JSON.parse(notificacion).img

    let div = document.createElement("div")
    div.classList.add("col-md-6")
    div.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-md-4">
                <img src="${img}" class="img-fluid rounded-start">
                </div>
            <div class="col-md-8">
            <div class="card-body">
            <small class="text-muted"></small>
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${contenido}</p>
                    </div>
            </div>
        </div>
    </div>
    `
    container.appendChild(div)
})
