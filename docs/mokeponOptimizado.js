const bMascota = document.getElementById("bselMascota")
const sectionReiniciar = document.getElementById("reiniciar")
const botonReinicio = document.getElementById("bReiniciar")
const sectionSelAtaque = document.getElementById("seleccionarAtaque")
const spanMascotaJugador = document.getElementById("spanNombreM")
const sectionSelJug = document.getElementById("seleccionarMascota")
const spanMascotaEnemy = document.getElementById("spanNombreMEnemy")
const VidaJ = document.getElementById("spanVidaJ")
const VidaE = document.getElementById("spanVidaE")
const contenedorMensajes = document.getElementById("mensajes")
const sectionMensajes = document.getElementById("Resultado")
const AtaqueDelJugador = document.getElementById("AtaqueJugador")
const AtaqueDelEnemy = document.getElementById("AtaqueEnemy")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorBAtaques = document.getElementById("contenedorBAtaques")

const sectionMapa = document.getElementById("verMapa")
const mapa = document.getElementById("mapa")

// Poner los 3 personajes addcionales, hacer los mokepones con tipo y podria hacer que el equipo mas fuerte tenga un ataque demas 

let mokepones = []
let ataqueJugador = []
let ataquesMokeponEnemy
let ataqueEnemy = []
let opcionMokepones
let botones = []
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputLangostelvis
let inputTucapalma
let inputPydos
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon

let indexAtaqueJugador
let indexAtaqueEnemy
let victoriasJugador = 0
let victoriasEnemigo = 0
let contadorVidaJ = 3
let contadorVidaE = 3

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoMapa = 400

if (anchoDelMapa > anchoMaximoMapa) {
    anchoDelMapa = anchoMaximoMapa - 20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
    constructor(nombre, foto, vida, fotoMapa,) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80

        this.x = 0
        this.y = 0
        this.velocidadX = 0
        this.velocidadY = 0
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/Rhipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/Rcapipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/Rratigueya.png")

let hipodogeEnemy = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5, "./assets/Rhipodoge.png")
let capipepoEnemy = new Mokepon("Capipepo", "./assets/Capipepo.png", 5, "./assets/Rcapipepo.png")
let ratigueyaEnemy = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5, "./assets/Rratigueya.png")

hipodoge.ataques.push(
    { nombre: "💧", id: "bAgua" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🌱", id: "bTierra" },
)

capipepo.ataques.push(
    { nombre: "🌱", id: "bTierra" },
    { nombre: "🌱", id: "bTierra" },
    { nombre: "🌱", id: "bTierra" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🔥", id: "bFuego" },
)

ratigueya.ataques.push(
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🌱", id: "bTierra" },
)

//Ataque Enemigos

hipodogeEnemy.ataques.push(
    { nombre: "💧", id: "bAgua" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🌱", id: "bTierra" },
)

capipepoEnemy.ataques.push(
    { nombre: "🌱", id: "bTierra" },
    { nombre: "🌱", id: "bTierra" },
    { nombre: "🌱", id: "bTierra" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🔥", id: "bFuego" },
)

ratigueyaEnemy.ataques.push(
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "🔥", id: "bFuego" },
    { nombre: "💧", id: "bAgua" },
    { nombre: "🌱", id: "bTierra" },
)

mokepones.push(hipodoge, capipepo, ratigueya)


function iniciarJuego() {
    sectionMapa.style.display = "none"
    sectionSelAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"
    mokepones.forEach((mokepon) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjetaDeMokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionMokepones
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
        inputLangostelvis = document.getElementById("Langostelvis")
        inputTucapalma = document.getElementById("Tucapalma")
        inputPydos = document.getElementById("Pydos")
    })
    bMascota.addEventListener("click", selMascotaJugador)
    botonReinicio.addEventListener("click", ReiniciarJuego)
}

function selMascotaJugador() {
    let jugar = 1

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
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
    extraerAtaque(mascotaJugador)
    if (jugar == 1) {
        sectionMapa.style.display = "flex"
        iniciarMapa()
    }
}

function extraerAtaque(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="Bataque BotonAtaque">${ataque.nombre}</button>`
        contenedorBAtaques.innerHTML += ataquesMokepon
    })
    botonFuego = document.getElementById("bFuego")
    botonAgua = document.getElementById("bAgua")
    botonTierra = document.getElementById("bTierra")
    botones = document.querySelectorAll(".BotonAtaque")

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("Fuego")
                console.log(ataqueJugador)
                boton.style.background = "#112F58"
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("Agua")
                console.log(ataqueJugador)
                boton.style.background = "#112F58"
            } else {
                ataqueJugador.push("Tierra")
                console.log(ataqueJugador)
                boton.style.background = "#112F58"
            }
            boton.disabled = true
            ataqueAleEnemy()
        })
    })

}

function selMascotaEnemy(Enemy) {
    spanMascotaEnemy.innerHTML = Enemy.nombre
    ataquesMokeponEnemy = Enemy.ataques
    secuenciaAtaque()
}

function ataqueAleEnemy() {
    console.log("Ataques Enemigo", ataquesMokeponEnemy)
    let ataqueAleatorio = numAleatorio(0, ataquesMokeponEnemy.length - 1)
    let ataque = ataquesMokeponEnemy[ataqueAleatorio].nombre

    if (ataque === "🔥") ataqueEnemy.push("Fuego")
    else if (ataque === "💧") ataqueEnemy.push("Agua")
    else ataqueEnemy.push("Tierra")
    iniciarPelea()

}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}
function crearMensaje(decision) {

    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemy = document.createElement("p")
    contenedorMensajes.classList.remove("oculto")
    contenedorMensajes.style.display = "flex"
    sectionMensajes.innerHTML = decision

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemy.innerHTML = indexAtaqueEnemy

    AtaqueDelJugador.appendChild(nuevoAtaqueJugador)
    AtaqueDelEnemy.appendChild(nuevoAtaqueEnemy)
}

function crearMensajeFinal(resultadoFinal) {
    sectionReiniciar.style.display = "block"
    sectionMensajes.innerHTML = resultadoFinal

    botones.forEach((boton) => {

        boton.style.opacity = "0.6"
    })
}

function numAleatorio(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

function indexAmbosOponentes(Jugador, Enemy) {
    indexAtaqueJugador = ataqueJugador[Jugador]
    indexAtaqueEnemy = ataqueEnemy[Enemy]
}

function combate() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemy[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("Empate")
        } else if (ataqueJugador[i] === "Fuego" && ataqueEnemy[i] === "Tierra") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            VidaJ.innerHTML = victoriasJugador
            console.log(victoriasJugador)
        } else if (ataqueJugador[i] === "Agua" && ataqueEnemy[i] === "Fuego") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            VidaJ.innerHTML = victoriasJugador
            console.log(VidaJ)
        } else if (ataqueJugador[i] === "Tierra" && ataqueEnemy[i] === "Agua") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            VidaJ.innerHTML = victoriasJugador
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            VidaE.innerHTML = victoriasEnemigo
            console.log(victoriasEnemigo)
        }
    }
    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un Empate")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones, Ganaste")
    } else {
        crearMensajeFinal("Perdiste")
    }
}
function ReiniciarJuego() {
    location.reload()
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMas(mascotaJugador)
    mascotaJugadorObjeto.x = 0
    mascotaJugadorObjeto.y = 0


    posicionAleatoriaLejosDelJugador(hipodogeEnemy)
    posicionAleatoriaLejosDelJugador(capipepoEnemy)
    posicionAleatoriaLejosDelJugador(ratigueyaEnemy)
    intervalo = setInterval(pintarCanvas, 50)
    sectionSelJug.style.display = "none"
    window.addEventListener("keydown", accionTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemy.pintarMokepon()
    capipepoEnemy.pintarMokepon()
    ratigueyaEnemy.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColisicion(hipodogeEnemy)
        revisarColisicion(capipepoEnemy)
        revisarColisicion(ratigueyaEnemy)
    }
}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = - 5
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = - 5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}
function detenerMovimiento() {


    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function accionTecla(event) {
    switch (event.code) {
        case "KeyW":
            moverArriba()
            break;
        case "KeyD":
            moverDerecha()
            break;
        case "KeyA":
            moverIzquierda()
            break;
        case "KeyS":
            moverAbajo()
            break;

        default:
            break;
    }
}

function obtenerObjetoMas() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }

    }
}

function revisarColisicion(Enemy) {
    const margenAl = 50
    const margenA = 70
    const arribaEnemy = Enemy.y
    const abajoEnemy = Enemy.y + (Enemy.alto - margenAl)
    const derechaEnemy = Enemy.x + (Enemy.ancho - margenA)
    const izquierdaEnemy = Enemy.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + (mascotaJugadorObjeto.alto - margenAl)
    const derechaMascota = mascotaJugadorObjeto.x + (mascotaJugadorObjeto.ancho - margenA)
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (abajoMascota < arribaEnemy ||
        arribaMascota > abajoEnemy ||
        derechaMascota < izquierdaEnemy ||
        izquierdaMascota > derechaEnemy
    ) {
        return
    }
    detenerMovimiento()
    console.log("Se detecto una colision")
    sectionSelAtaque.style.display = "flex"
    sectionMapa.style.display = "none"
    clearInterval(intervalo)
    selMascotaEnemy(Enemy)
}

function posicionAleatoriaLejosDelJugador(mokepon) {
    const distanciaMinima = 120

    for (let i = 0; i < 100; i++) { // evita loop infinito
        let x = numAleatorio(0, mapa.width - mokepon.ancho)
        let y = numAleatorio(0, mapa.height - mokepon.alto)

        let dx = x - mascotaJugadorObjeto.x
        let dy = y - mascotaJugadorObjeto.y
        let distancia = Math.sqrt(dx * dx + dy * dy)

        if (distancia > distanciaMinima) {
            mokepon.x = x
            mokepon.y = y
            return
        }
    }

    // fallback
    mokepon.x = 200
    mokepon.y = 200
}

window.addEventListener("load", iniciarJuego)
