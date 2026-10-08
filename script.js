function comenzar (){
    alert("¡comenzaremos el cuestionario!");
}
/* =========================================
   CUESTIONARIO
========================================= */


const preguntas = [

    {
        pregunta:
        "¿Te resulta difícil adaptarte cuando cambia una rutina que conoces?",

        respuestas: [
            "Nunca",
            "A veces",
            "Frecuentemente",
            "Siempre"
        ]
    },


    {
        pregunta:
        "¿Te resulta difícil saber cómo iniciar una conversación con otras personas?",

        respuestas: [
            "Nunca",
            "A veces",
            "Frecuentemente",
            "Siempre"
        ]
    },


    {
        pregunta:
        "¿Te interesan mucho determinados temas o actividades y puedes concentrarte bastante en ellos?",

        respuestas: [
            "Nunca",
            "A veces",
            "Frecuentemente",
            "Siempre"
        ]
    },


    {
        pregunta:
        "¿Algunos sonidos, luces, texturas u olores te resultan especialmente molestos?",

        respuestas: [
            "Nunca",
            "A veces",
            "Frecuentemente",
            "Siempre"
        ]
    },


    {
        pregunta:
        "¿Te resulta difícil interpretar algunas expresiones, gestos o emociones de otras personas?",

        respuestas: [
            "Nunca",
            "A veces",
            "Frecuentemente",
            "Siempre"
        ]
    }

];


let preguntaActual = 0;

let respuestasUsuario = [];


/* COMENZAR CUESTIONARIO */

function comenzarCuestionario() {

    document.getElementById("inicio").style.display = "none";

    document.getElementById("cuestionario").style.display = "block";

    mostrarPregunta();

}


/* MOSTRAR PREGUNTA */

function mostrarPregunta() {

    const pregunta = preguntas[preguntaActual];


    document.getElementById("progreso").textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;


    document.getElementById("textoPregunta").textContent =
        pregunta.pregunta;


    const contenedor =
        document.getElementById("respuestas");


    contenedor.innerHTML = "";


    document.getElementById("siguiente").disabled = true;


    pregunta.respuestas.forEach((respuesta, indice) => {

        const boton =
            document.createElement("button");


        boton.textContent = respuesta;


        boton.classList.add("respuesta");


        boton.onclick = function() {

            document
                .querySelectorAll(".respuesta")
                .forEach(boton =>
                    boton.classList.remove("seleccionada")
                );


            boton.classList.add("seleccionada");


            respuestasUsuario[preguntaActual] = indice;


            document.getElementById("siguiente")
                .disabled = false;

        };


        contenedor.appendChild(boton);

    });

}


/* SIGUIENTE PREGUNTA */

function siguientePregunta() {

    preguntaActual++;


    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    }

    else {

        mostrarResultadosCuestionario();

    }

}


/* RESULTADOS DEL CUESTIONARIO */

function mostrarResultadosCuestionario() {

    let puntuacion = 0;


    respuestasUsuario.forEach(respuesta => {

        puntuacion += respuesta;

    });


    document.getElementById("cuestionario").innerHTML = `

        <h2>Cuestionario terminado</h2>

        <p>Gracias por responder.</p>

        <h3>Resultado orientativo: ${puntuacion}</h3>

        <p>
            Este resultado únicamente representa las respuestas
            registradas en esta actividad.
        </p>

        <p class="aviso">
            ⚠️ No constituye un diagnóstico médico.
        </p>

        <button onclick="mostrarActividadSonidos()">
            Continuar a actividad de sonidos 🔊
        </button>

    `;

}


/* =========================================
   ACTIVIDAD DE SONIDOS
========================================= */


/*
    AQUÍ SE INDICAN LOS ARCHIVOS DE SONIDO.

    Deben estar dentro de:

    NeuroCheck/sonidos/

*/


const sonidos = [

    {
        nombre: "Sonido de voceiro",

        archivo: "sonidos/voceiro.mp3",

        icono: "🧏🏻",

        descripcion:
        "un grupo de personas hablamdo al mismo tiempo."
    },


    {
        nombre: "Campana",

        archivo: "sonidos/campana.mp3",

        icono: "🔔",

        descripcion:
        "Un sonido breve de campana."
    },


    {
        nombre: "Tráfico",

        archivo: "sonidos/trafico.mp3",

        icono: "🚗",

        descripcion:
        "Sonido ambiental de tráfico."
    },


    {
        nombre: "Ladrido",

        archivo: "sonidos/perro.mp3",

        icono: "🐶",

        descripcion:
        "Un sonido de perro ladrando."
    },


    {
        nombre: "Sonido agudo",

        archivo: "sonidos/sonido_agudo.mp3",

        icono: "🔊",

        descripcion:
        "Un sonido de tono agudo a volumen moderado."
    }

];


let sonidoActual = 0;

let reproductor = null;


let resultadosSonidos = {

    comodo: 0,

    neutral: 0,

    incomodo: 0

};


/* MOSTRAR ACTIVIDAD */

function mostrarActividadSonidos() {

    document.getElementById("cuestionario")
        .style.display = "none";


    document.getElementById("actividadSonidos")
        .style.display = "block";


    mostrarSonido();

}


/* MOSTRAR SONIDO */

function mostrarSonido() {

    detenerSonido();


    const sonido = sonidos[sonidoActual];


    document.getElementById("nombreSonido")
        .textContent = sonido.nombre;


    document.getElementById("descripcionSonido")
        .textContent = sonido.descripcion;


    document.getElementById("iconoSonido")
        .textContent = sonido.icono;


    document.getElementById("progresoSonido")
        .textContent =
        `Sonido ${sonidoActual + 1} de ${sonidos.length}`;


    const porcentaje =
        ((sonidoActual + 1) / sonidos.length) * 100;


    document.getElementById("barraProgreso")
        .style.width = porcentaje + "%";


    reproductor =
        new Audio(sonido.archivo);

}


/* REPRODUCIR */

function reproducirSonido (){
    if(!reproductor){
        mostrarSonido();
    }
    reproductor.currentTime= 0;
    reproductor.play();
}

/* DETENER */

function detenerSonido() {

    if (reproductor) {

        reproductor.pause();

        reproductor.currentTime = 0;

    }

}


/* REGISTRAR RESPUESTA */

function registrarSensacion(sensacion) {

    resultadosSonidos[sensacion]++;


    detenerSonido();


    sonidoActual++;


    if (sonidoActual < sonidos.length) {

        mostrarSonido();

    }

    else {

        mostrarResultadoSonidos();

    }

}


/* =========================================
   RESULTADOS DE SONIDOS
========================================= */


function mostrarResultadoSonidos() {

    detenerSonido();


    document.getElementById("actividadSonidos")
        .style.display = "none";


    document.getElementById("resultadoSonidos")
        .style.display = "block";


    const total = sonidos.length;


    document.getElementById("resumenSonidos").innerHTML = `

        <div class="resultadoCaja">

            <p>
                😌 <strong>Sonidos cómodos:</strong>
                ${resultadosSonidos.comodo} de ${total}
            </p>


            <p>
                😐 <strong>Sonidos neutrales:</strong>
                ${resultadosSonidos.neutral} de ${total}
            </p>


            <p>
                😣 <strong>Sonidos incómodos:</strong>
                ${resultadosSonidos.incomodo} de ${total}
            </p>

        </div>

    `;

}


/* =========================================
   REINICIAR
========================================= */

/* =========================================
   ACTIVIDAD DE ORDEN
========================================= */

let objetoArrastrado = null;

function mostrarActividadOrden() {
    document.getElementById("resultadoSonidos").style.display = "none";
    document.getElementById("actividadOrden").style.display = "block";

    iniciarArrastre();
}

function iniciarArrastre() {

    const objetos = document.querySelectorAll(".objeto");
    const zona = document.getElementById("zonaOrden");

    objetos.forEach(objeto => {

        objeto.addEventListener("dragstart", function() {
            objetoArrastrado = objeto;
        });

    });

    zona.addEventListener("dragover", function(evento) {
        evento.preventDefault();
    });

    zona.addEventListener("drop", function(evento) {
        evento.preventDefault();

        if (objetoArrastrado) {
            zona.appendChild(objetoArrastrado);
            objetoArrastrado = null;
        }
    });
}

function comprobarOrden() {

    const zona = document.getElementById("zonaOrden");
    const objetos = zona.querySelectorAll(".objeto");

    if (objetos.length < 5) {

        document.getElementById("resultadoOrden").innerHTML = `
            <div class="resultadoOrdenIntento">
                <p>⚠️ Primero coloca todos los objetos en la zona.</p>
            </div>
        `;

        return;
    }

    let correcto = true;

    objetos.forEach((objeto, indice) => {

        const ordenCorrecto = Number(objeto.dataset.orden);

        if (ordenCorrecto !== indice + 1) {
            correcto = false;
        }

    });

    if (correcto) {
           document.getElementById("resultadoOrden").innerHTML = `
        <div class="resultadoOrdenCorrecto">
            <h3>🎉 ¡Muy bien!</h3>

            <p>
                Organizaste correctamente todos los objetos.
            </p>

            <button onclick="mostrarActividadFluidos()">
                Continuar 🌈
            </button>
        </div>
    `;


    } else {

        document.getElementById("resultadoOrden").innerHTML = `
            <div class="resultadoOrdenIntento">
                <h3>😊 ¡Buen intento!</h3>
                <p>
                    El orden no coincide con la secuencia indicada.
                    Puedes volver a acomodarlos e intentarlo otra vez.
                </p>
            </div>
        `;
    }
}
document.getElementById("resultadoOrden").innerHTML = `
    <div class="resultadoOrdenCorrecto">
        <h3>🎉 ¡Muy bien!</h3>
        <p>
            Organizaste correctamente todos los objetos.
        </p>

        <button onclick="mostrarActividadFluidos()">
            Continuar 🌈
        </button>
    </div>
`;
/* =========================================
   SIMULADOR DE FLUIDOS
========================================= */

let canvasFluidos;
let contextoFluidos;
let particulasFluidos = [];

let dibujandoFluidos = false;
let animacionFluidos;

function mostrarActividadFluidos() {

    // Ocultar actividades anteriores
    document.getElementById("actividadOrden").style.display = "none";
    document.getElementById("actividadFluidos").style.display = "block";

    iniciarFluidos();
}

function iniciarFluidos() {

    canvasFluidos = document.getElementById("canvasFluidos");
    contextoFluidos = canvasFluidos.getContext("2d");

    ajustarCanvasFluidos();

    // Evitar iniciar la simulación varias veces
    if (!animacionFluidos) {
        animarFluidos();
        document.getElementById("reiniciarFluidos").addEventListener("click", reiniciarFluidos);
    }

    // Mouse
    canvasFluidos.addEventListener("mousedown", comenzarFluido);
    canvasFluidos.addEventListener("mousemove", moverFluido);
    canvasFluidos.addEventListener("mouseup", terminarFluido);
    canvasFluidos.addEventListener("mouseleave", terminarFluido);

    // Pantalla táctil
    canvasFluidos.addEventListener("touchstart", comenzarFluido, {
        passive: false
    });

    canvasFluidos.addEventListener("touchmove", moverFluido, {
        passive: false
    });

    canvasFluidos.addEventListener("touchend", terminarFluido);

    // Limpiar
    document
        .getElementById("limpiarFluidos")
        .addEventListener("click", limpiarFluidos);

    window.addEventListener("resize", ajustarCanvasFluidos);
}


/* =========================================
   AJUSTAR CANVAS
========================================= */

function ajustarCanvasFluidos() {

    if (!canvasFluidos) return;

    const rect = canvasFluidos.getBoundingClientRect();

    canvasFluidos.width = rect.width;
    canvasFluidos.height = rect.height;
}


/* =========================================
   INTERACCIÓN
========================================= */

function comenzarFluido(evento) {

    evento.preventDefault();

    dibujandoFluidos = true;

    crearFluido(evento);
}


function moverFluido(evento) {

    if (!dibujandoFluidos) return;

    evento.preventDefault();

    crearFluido(evento);
}


function terminarFluido() {

    dibujandoFluidos = false;
}


/* =========================================
   CREAR FLUIDO
========================================= */

function crearFluido(evento) {

    const posicion = obtenerPosicion(evento);

    const color = document.getElementById("colorFluido").value;

    const tamano = Number(
        document.getElementById("tamanoFluido").value
    );

    // Crear varias partículas
    for (let i = 0; i < 8; i++) {

        particulasFluidos.push({

            x: posicion.x + (Math.random() - 0.5) * 20,

            y: posicion.y + (Math.random() - 0.5) * 20,

            vx: (Math.random() - 0.5) * 1.5,

            vy: (Math.random() - 0.5) * 1.5,

            radio: tamano * (0.5 + Math.random() * 0.6),

            color: color,

            vida: 1
        });
    }

    // Limitar cantidad de partículas
    if (particulasFluidos.length > 500) {

        particulasFluidos.splice(
            0,
            particulasFluidos.length - 500
        );
    }
}


/* =========================================
   OBTENER POSICIÓN
========================================= */

function obtenerPosicion(evento) {

    const rect = canvasFluidos.getBoundingClientRect();

    let x;
    let y;

    if (evento.touches && evento.touches.length > 0) {

        x = evento.touches[0].clientX - rect.left;
        y = evento.touches[0].clientY - rect.top;

    } else {

        x = evento.clientX - rect.left;
        y = evento.clientY - rect.top;
    }

    return {
        x: x,
        y: y
    };
}


/* =========================================
   ANIMACIÓN
========================================= */

function animarFluidos() {

    if (!contextoFluidos) return;

    contextoFluidos.fillStyle = "rgba(8, 8, 18, 0.08)";

    contextoFluidos.fillRect(
        0,
        0,
        canvasFluidos.width,
        canvasFluidos.height
    );

    for (let i = particulasFluidos.length - 1; i >= 0; i--) {

        const particula = particulasFluidos[i];

        // Movimiento tipo humo
        particula.vx +=
            Math.sin(particula.y * 0.01) * 0.01;

        particula.vy +=
            Math.cos(particula.x * 0.01) * 0.01;

        particula.x += particula.vx;
        particula.y += particula.vy;

        // Movimiento hacia arriba muy suave
        particula.vy -= 0.003;

        // Reducir lentamente
        particula.vida -= 0.002;

        dibujarParticula(particula);

        // Eliminar partículas viejas
        if (
            particula.vida <= 0 ||
            particula.x < -100 ||
            particula.x > canvasFluidos.width + 100 ||
            particula.y < -100 ||
            particula.y > canvasFluidos.height + 100
        ) {

            particulasFluidos.splice(i, 1);
        }
    }

    animacionFluidos = requestAnimationFrame(animarFluidos);
}


/* =========================================
   DIBUJAR PARTÍCULA
========================================= */

function dibujarParticula(particula) {

    const gradiente =
        contextoFluidos.createRadialGradient(
            particula.x,
            particula.y,
            0,
            particula.x,
            particula.y,
            particula.radio
        );

    gradiente.addColorStop(
        0,
        convertirColor(particula.color, 0.7 * particula.vida)
    );

    gradiente.addColorStop(
        1,
        convertirColor(particula.color, 0)
    );

    contextoFluidos.beginPath();

    contextoFluidos.fillStyle = gradiente;

    contextoFluidos.arc(
        particula.x,
        particula.y,
        particula.radio,
        0,
        Math.PI * 2
    );

    contextoFluidos.fill();
}


/* =========================================
   CONVERTIR HEX A RGBA
========================================= */

function convertirColor(hex, alpha) {

    const numero = parseInt(
        hex.substring(1),
        16
    );

    const r = (numero >> 16) & 255;
    const g = (numero >> 8) & 255;
    const b = numero & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


/* =========================================
   LIMPIAR
========================================= */

function limpiarFluidos() {

    particulasFluidos = [];

    if (contextoFluidos) {

        contextoFluidos.clearRect(
            0,
            0,
            canvasFluidos.width,
            canvasFluidos.height
        );
    }
}

function reiniciarPagina() {

    location.reload();

}
function reiniciarFluidos() {
    // Elimina todas las partículas
    particulasFluidos = [];

    // Limpia completamente el canvas
    contextoFluidos.clearRect(
        0,
        0,
        canvasFluidos.width,
        canvasFluidos.height
    );

    // Regresa los controles a sus valores iniciales
    document.getElementById("colorFluido").value = "#00ffff";
    document.getElementById("tamanoFluido").value = 20;
}

// ===============================
// MOSTRAR DIFERENTES SECCIONES
// ===============================

function mostrarSeccion(seccion) {

    const secciones = [
        "inicio",
        "informacion",
        "cuestionario",
        "actividadSonidos",
        "resultadoSonidos",
        "actividadOrden",
        "actividadFluidos",
        "final"
    ];

    secciones.forEach(function(id) {

        const elemento = document.getElementById(id);

        if (elemento) {
            elemento.style.display = "none";
        }

    });

    const seleccionada = document.getElementById(seccion);

    if (seleccionada) {
        seleccionada.style.display = "block";
    }

    if (seccion === "actividadFluidos") {
        mostrarActividadFluidos();
    }
}


// ===============================
// MOSTRAR INICIO AL ABRIR
// ===============================

window.onload = function() {

    mostrarSeccion("inicio");

};