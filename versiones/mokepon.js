let ataqueJugador
let ataqueEnemy
let contadorVidaJ = 3
let contadorVidaE = 3
function iniciarJuego() {
    let sectionSelAtaque = document.getElementById("seleccionarAtaque")
    sectionSelAtaque.style.display = "none"
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "none"

    let bMascota = document.getElementById("bselMascota")
    bMascota.addEventListener("click", selMascotaJugador)

    let botonFuego = document.getElementById("bFuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("bAgua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("bTierra")
    botonTierra.addEventListener("click", ataqueTierra)
    let botonReinicio = document.getElementById("bReiniciar")
    botonReinicio.addEventListener("click", ReiniciarJuego)

}

function selMascotaJugador() {

    let jugar = 1
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let inputLangostelvis = document.getElementById("langostelvis")
    let inputTucapalma = document.getElementById("tucapalma")
    let inputPydos = document.getElementById("pydos")
    let spanMascotaJugador = document.getElementById("spanNombreM")
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
    } /* else if (inputLangostelvis.checked) {
        spanMascotaJugador.innerHTML ="Langostelvis"
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML ="Tucapalma"
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML ="Pydos"
    }  */else {
        alert("No has seleccionado tu Mascota")
        jugar = 0
    }
    if (jugar == 1) {
        selMascotaEnemy()
        let sectionSelAtaque = document.getElementById("seleccionarAtaque")
        sectionSelAtaque.style.display = "flex"
        let sectionSelJug = document.getElementById("seleccionarMascota")
        sectionSelJug.style.display = "none"
    }

}
function selMascotaEnemy() {
    let ataqueAleatorioMascota = numAleatorio(1, 3)
    let spanMascotaEnemy = document.getElementById("spanNombreMEnemy")

    if (ataqueAleatorioMascota == 1) {
        spanMascotaEnemy.innerHTML = "Hipodoge"
        //Hipodoge
    } else if (ataqueAleatorioMascota == 2) {
        spanMascotaEnemy.innerHTML = "Capipepo"
        //Capipepo
    } else {
        spanMascotaEnemy.innerHTML = "Ratigueya"
        //Ratigueya
    }

}
function ataqueFuego() {
    ataqueJugador = "Fuego"
    ataqueAleEnemy()
}
function ataqueAgua() {
    ataqueJugador = "Agua"
    ataqueAleEnemy()
}
function ataqueTierra() {
    ataqueJugador = "Tierra"
    ataqueAleEnemy()
}
function ataqueAleEnemy() {
    let ataqueAleatorio = numAleatorio(1, 3)

    if (ataqueAleatorio == 1) {
        ataqueEnemy = "Fuego"
    } else if (ataqueAleatorio == 2) {
        ataqueEnemy = "Agua"
    } else {
        ataqueEnemy = "Tierra"
    }
    combate()
}
function crearMensaje(decision) {
    let contenedorMensajes = document.getElementById("mensajes")
    let sectionMensajes = document.getElementById("Resultado")
    let AtaqueJugador = document.getElementById("AtaqueJugador")
    let AtaqueEnemy= document.getElementById("AtaqueEnemy")

    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemy = document.createElement("p")
    contenedorMensajes.classList.remove("oculto")
    contenedorMensajes.style.display="flex"
    sectionMensajes.innerHTML = decision
    
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemy.innerHTML = ataqueEnemy

//     let parrafo = document.createElement("p")
//     parrafo.innerHTML = "Tu mascota ataco con: " + ataqueJugador + " La mascota del enemigo ataco con: " + ataqueEnemy + " - " + decision
    AtaqueJugador.appendChild(nuevoAtaqueJugador)
    AtaqueEnemy.appendChild(nuevoAtaqueEnemy)
}
function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("Resultado")
    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = "block"

    
    sectionMensajes.innerHTML = resultadoFinal
    

    let botonFuego = document.getElementById("bFuego")
    botonFuego.disabled = true
    let botonAgua = document.getElementById("bAgua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("bTierra")
    botonTierra.disabled = true
}
function numAleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}
function combate() {
    let VidaJ = document.getElementById("spanVidaJ")
    let VidaE = document.getElementById("spanVidaE")
    if (ataqueEnemy == ataqueJugador) {
        crearMensaje("Empate")
    } else if (ataqueJugador == "Fuego" && ataqueEnemy == "Tierra") {
        crearMensaje("Ganaste")
        contadorVidaE--
        VidaE.innerHTML = contadorVidaE

    } else if (ataqueJugador == "Agua" && ataqueEnemy == "Fuego") {
        crearMensaje("Ganaste")
        contadorVidaE--
        VidaE.innerHTML = contadorVidaE
    } else if (ataqueJugador == "Tierra" && ataqueEnemy == "Agua") {
        crearMensaje("Ganaste")
        contadorVidaE--
        VidaE.innerHTML = contadorVidaE
    } else {
        crearMensaje("Perdiste")
        contadorVidaJ--
        VidaJ.innerHTML = contadorVidaJ
    }
    revisarVidas()
}
function revisarVidas() {
    if (contadorVidaE == 0) {
        crearMensajeFinal("Ganaste La Batalla")
    } else if (contadorVidaJ == 0) {
        crearMensajeFinal("Perdiste La Batalla")
    }
}
function ReiniciarJuego() {
    location.reload()
}


window.addEventListener("load", iniciarJuego)
