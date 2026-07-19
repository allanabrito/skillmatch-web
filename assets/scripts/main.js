import {
    Candidato,
    executarAnalise
} from "./motor.js";

import {
    carregarVagas,
    salvarPerfil
} from "./dados.js";

import {
    renderizarVagas,
    renderizarMelhorVaga
} from "./ui.js";

console.log("Main carregado");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Sistema iniciado");
    iniciarSistema();
});

async function iniciarSistema() {

    const vagas = await carregarVagas();

    const formulario = document.getElementById("form-perfil");

    formulario.addEventListener("submit", function (event) {

        console.log("clique no botão de enviar");

        event.preventDefault();

        const candidato = new Candidato(
            document.getElementById("nome").value,
            document.getElementById("area").value,
            document
                .getElementById("habilidades")
                .value
                .split(",")
                .map(skill => skill.trim()),
            Number(document.getElementById("experiencia").value)
        );

        salvarPerfil(candidato);

       const resultado = executarAnalise(candidato, vagas);

console.log(resultado);

renderizarVagas(resultado.resultados);

renderizarMelhorVaga(
            resultado.melhorVaga,
            resultado.recomendacao
        );

    });

}