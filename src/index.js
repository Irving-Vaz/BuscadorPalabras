import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swal from "sweetalert2";

const TextoPaLeer = document.getElementById('textoALeer');
const PalabraBuscar = document.getElementById('PalabraABuscar');
const contador = document.getElementById('contador');
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpiar = document.getElementById('btnLimpiar');
const textoResaltadoDiv = document.getElementById('textoResaltado');

const ValidarPalabra = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

const buscarPalabra = () => {
    const NuevoTexto = TextoPaLeer.value.replace(/^\s+|\s+$/g, '');
    const NuevaPalabra = PalabraBuscar.value.replace(/^\s+|\s+$/g, '');

    if (!NuevoTexto || !NuevaPalabra) {
        Swal.fire({
            icon: 'error',
            title: 'Campos en blanco',
            text: 'Verificar si el texto o la palabra/caracter han sido llenados'
        });
        return;
    }

    if (!ValidarPalabra.test(NuevaPalabra)) {
        Swal.fire({
            icon: 'error',
            title: 'Palabra/caracter no correcto',
            text: 'La palabra y/o caracter no son correctos para buscar, favor de verificar'
        });
        return;
    }
    const palabrasArray = NuevoTexto.split(/\s+/);
    const coincidenciasArray = palabrasArray
        .filter(palabraActual => {
            const reglaComparacion = new RegExp(`^${NuevaPalabra}$`, 'i');
            return reglaComparacion.test(palabraActual);
        })
        .map(palabraCoincidente => {
            return palabraCoincidente;
        });

    const reglaRemarcar = new RegExp(`(${NuevaPalabra})`, 'gi');
    textoResaltadoDiv.innerHTML = NuevoTexto.replace(reglaRemarcar, '<mark>$1</mark>');

    const totalEncontrado = coincidenciasArray.length;

    contador.textContent = totalEncontrado;
    
    if (totalEncontrado === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Sin coincidencias',
            text: `No se encontro la palabra "${NuevaPalabra}" en el texto`
        });
    }
};

const limpiar = () => {
    TextoPaLeer.value = '';
    PalabraBuscar.value = '';
    contador.textContent = '0';
    textoResaltadoDiv.innerHTML = '';
};

btnBuscar.addEventListener('click', buscarPalabra);
btnLimpiar.addEventListener('click', limpiar);