/* const btnAlertContinuar = document.getElementById('btnAlertContinuar')
const btnAlertCancelar = document.getElementById('btnAlertContinuar') */

window.addEventListener("load", function () {
    const notificacionesAlmacenadas = []
    let temp = ""
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

    if (Notification && Notification.permission === "granted") {
        const btn = document.getElementById("btn")
        const inputTitulo = document.getElementById("titulo")
        const inputContenido = document.getElementById("contenido")
        const inputImg = document.getElementById("img")
        const prevTitulo = document.getElementById("prev-titulo")
        const prevContenido = document.getElementById("prev-contenido")
        const prevImg = document.getElementById("prev-img")
        const minTitulo = 8,
            maxTitulo = 30,
            minContenido = 10,
            maxContenido = 50

        inputTitulo.addEventListener("focus", () => {
            document.getElementById("mensaje").innerHTML = ""
        })

        inputTitulo.addEventListener("input", e => {
            const feedback = document.getElementById("titulo-feedback")
            if (e.target.value.length === 0) {
                e.target.classList.remove("border-success", "border-danger")
                e.target.classList.add("border", "border-secondary")
                feedback.classList.remove("text-danger", "text-success")
                feedback.innerHTML = "Debe contener 8 carácteres mínimo."
            } else if (
                e.target.value.length > minTitulo &&
                e.target.value.length < maxTitulo
            ) {
                e.target.classList.remove("border-secondary", "border-danger")
                e.target.classList.add("border-success")
                feedback.classList.remove("text-danger", "text-muted")
                feedback.classList.add("text-success")
                feedback.innerHTML = `✔ Debe contener entre ${minTitulo} y ${maxTitulo} carácteres.`
            } else {
                e.target.classList.remove("border-success", "border-secondary")
                e.target.classList.add("border-danger")
                feedback.classList.remove("text-success", "text-muted")
                feedback.classList.add("text-danger")
                feedback.innerHTML = `❌ Debe contener entre ${minTitulo} y ${maxTitulo} carácteres.`
            }
        })

        inputContenido.addEventListener("input", e => {
            const feedback = document.getElementById("contenido-feedback")
            if (e.target.value.length === 0) {
                e.target.classList.remove("border-success", "border-danger")
                e.target.classList.add("border", "border-secondary")
                feedback.classList.remove("text-danger", "text-success")
                feedback.classList.add("text-muted")
                feedback.innerHTML = `Debe contener 10 y 50 carácteres.`
            } else if (
                e.target.value.length > minContenido &&
                e.target.value.length < maxContenido
            ) {
                e.target.classList.remove("border-secondary", "border-danger")
                e.target.classList.add("border-success")
                feedback.classList.remove("text-danger", "text-muted")
                feedback.classList.add("text-success")
                feedback.innerHTML = `✔ Debe contener entre ${minContenido} y ${maxContenido} carácteres.`
            } else {
                e.target.classList.remove("border-success", "border-secondary")
                e.target.classList.add("border-danger")
                feedback.classList.remove("text-success", "text-muted")
                feedback.classList.add("text-danger")
                feedback.innerHTML = `❌ Debe contener entre ${minContenido} y ${maxContenido} carácteres.`
            }
        })

        const previsualizacion = () => {
            setInterval(() => {
                prevTitulo.innerHTML = inputTitulo.value
                prevContenido.innerHTML = inputContenido.value
            }, 100)
        }
        previsualizacion()

        inputImg.addEventListener("change", e => {
            const feedback = document.getElementById("imagen-feedback")
            if (e.target.files.length === 1) {
                const reader = new FileReader()
                const files = e.target.files[0]
                reader.readAsDataURL(files)
                reader.onload = function () {
                    temp = reader.result
                }
                prevImg.src = URL.createObjectURL(files)

                e.target.classList.add("border", "border-success")
                e.target.classList.remove("border-danger")
                feedback.innerHTML = files.name
                feedback.classList.remove("text-muted", "text-danger")
                feedback.classList.add("text-success")
            } else {
                prevImg.src = ""
                e.target.classList.add("border", "border-danger")
                e.target.classList.remove("border-success")
                feedback.classList.remove("text-muted", "text-success")
                feedback.classList.add("text-danger")
                feedback.innerHTML = "La imágen fue removida de la selección."
            }
        })

        btn.addEventListener("click", function () {
            if (window.Notification && Notification.permission === "granted") {
                navigator.serviceWorker.register("sw.js")
                navigator.serviceWorker.ready
                const spawnNotification = (theTitle, theBody, theIcon) => {
                    const options = {
                        body: theBody,
                        icon: theIcon,
                    }
                    let n = new Notification(theTitle, options)
                }

                if (
                    inputTitulo.value.length > minTitulo &&
                    inputTitulo.value.length < maxTitulo &&
                    inputContenido.value.length > minContenido &&
                    inputContenido.value.length < maxContenido &&
                    inputImg.files.length === 1
                ) {
                    spawnNotification(
                        inputTitulo.value,
                        inputContenido.value,
                        prevImg.src
                    )
                    const notificacion = {
                        titulo: inputTitulo.value,
                        contenido: inputContenido.value,
                        img: temp,
                    }
                    localStorage.setItem(
                        `notificacion${localStorage.length}`,
                        JSON.stringify(notificacion)
                    )
                    document.getElementById("mensaje").innerHTML =
                        '<h3 class="mb-3 text-success text-center">La notificación ha sido enviada exitosamente</h3>'
                    document.querySelector(".badge").innerHTML =
                        localStorage.length
                    document.querySelector(".position-absolute").innerHTML =
                        localStorage.length
                    inputTitulo.value = ""
                    inputContenido.value = ""
                    inputImg.value = ""
                    prevTitulo.innerHTML = ""
                    prevContenido.innerHTML = ""
                    prevImg.src = ""
                    inputTitulo.classList.remove("border-success")
                    inputContenido.classList.remove("border-success")
                    inputImg.classList.remove("border", "border-success")
                    document
                        .getElementById("titulo-feedback")
                        .classList.remove("text-success")
                    document.getElementById("titulo-feedback").innerHTML =
                        "Debe contener 8 carácteres mínimo."
                    document
                        .getElementById("contenido-feedback")
                        .classList.remove("text-success")
                    document.getElementById("contenido-feedback").innerHTML =
                        "Debe contener entre 10 y 50 carácteres."
                    document
                        .getElementById("imagen-feedback")
                        .classList.remove("text-success")
                    document.getElementById("imagen-feedback").innerHTML = ""
                    clearInterval(previsualizacion)
                    document.getElementById("notificaciones").innerHTML = `
                    Notificaciones
                    <small>
                        <span id='notificacion'
                            class='position-absolute top-0 start-100 translate-middle bg-danger border border-light rounded-circle'>
                            ${localStorage.length}<span class='visually-hidden'>unread messages</span>
                        </span>
                    </small>
                    `
                    actualizarNotificaciones()
                } else {
                    document.getElementById("mensaje").innerHTML = `
                    <div class="toast show mx-auto mb-4 align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-body text-danger border border-danger">
                            ¡Oh no! Parece que tienes un dato incorrecto.<br>
                            Si todos los campos son verdes se enviará la notificación.
                        </div>
                    </div>
                    `
                }
            }
        })
    } else {
        document.querySelector(".card-body").innerHTML = `
        <div class="toast show mx-auto text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                Las notificaciones se encuentran desactivadas, vaya al ícono a la izquierda de la url y de clic en "Notificaciones" para activarlas
            </div>
        </div>
        `
        document.querySelector(".card-footer").innerHTML = `
        <h6>Una vez se activen las notificaciones, el formulario volverá a funcionar.</h6>
        `
    }
})
