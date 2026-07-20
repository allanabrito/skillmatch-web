import {
    Candidato,
    executarAnalise
} from "./motor.js";

import {
    carregarVagas,
    salvarPerfil,
    carregarPerfil
} from "./dados.js";

import {
    limparResultados,
    renderizarVagas,
    renderizarMelhorVaga
} from "./ui.js";

document.addEventListener("DOMContentLoaded", iniciarSistema);

async function iniciarSistema() {

    const vagas = await carregarVagas();
    const perfil = carregarPerfil();

if (perfil) {
    document.getElementById("nome").value = perfil.nome;
    document.getElementById("area").value = perfil.area;
    document.getElementById("habilidades").value = perfil.habilidades.join(", ");
    document.getElementById("experiencia").value = perfil.experienciaMeses;
}

    const formulario = document.getElementById("form-perfil");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();

        const area = document.getElementById("area").value;

        const habilidades = document
            .getElementById("habilidades")
            .value
            .trim();

        const experiencia = Number(
            document.getElementById("experiencia").value
        );

        if (!nome) {
            alert("O nome é obrigatório.");
            document.getElementById("nome").focus();
            return;
        }

        if (!habilidades) {
            alert("Informe pelo menos uma habilidade.");
            document.getElementById("habilidades").focus();
            return;
        }

        if (isNaN(experiencia) || experiencia <= 0) {
            alert("Informe uma experiência válida em meses.");
            document.getElementById("experiencia").focus();
            return;
        }

        const candidato = new Candidato(
            nome,
            area,
            habilidades
                .split(",")
                .map(skill => skill.trim()),
            experiencia
        );

        salvarPerfil(candidato);

        limparResultados();

       const resultado = executarAnalise(candidato, vagas);

console.log(resultado);

renderizarVagas(resultado.resultados);

renderizarMelhorVaga(
    resultado.melhorVaga,
    resultado.recomendacao
);

    });

}