import {
    Candidato,
    executarAnalise
} from "./motor.js";

import {
    carregarVagas,
    carregarPerfil,
    salvarPerfil
} from "./dados.js";

import {
    renderizarVagas,
    renderizarMelhorVaga
} from "./ui.js";

document.addEventListener("DOMContentLoaded", iniciarSistema);

async function iniciarSistema() {

    const vagas = await carregarVagas();

    console.log(vagas);

}