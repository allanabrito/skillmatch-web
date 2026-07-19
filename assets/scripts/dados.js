import { criarObjetosVagas } from "./motor.js";

const CHAVE = "perfil-candidato";

// ========================================
// CARREGAR VAGAS
// ========================================

export async function carregarVagas() {

    const areaVagas = document.getElementById("vagas");

    try {

        if (areaVagas) {
            areaVagas.innerHTML = "<p>Carregando vagas...</p>";
        }

        const resposta = await fetch("./assets/dados/vagas.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar vagas.");
        }

        const vagas = await resposta.json();

        if (vagas.length === 0) {

            if (areaVagas) {
                areaVagas.innerHTML = "<p>Nenhuma vaga encontrada.</p>";
            }

            return [];

        }

        return criarObjetosVagas(vagas);

    } catch (erro) {

        console.error("Erro:", erro);

        if (areaVagas) {
            areaVagas.innerHTML = "<p>Erro ao carregar as vagas.</p>";
        }

        return [];

    }

}

// ========================================
// SALVAR PERFIL
// ========================================

export function salvarPerfil(candidato) {

    localStorage.setItem(
        CHAVE,
        JSON.stringify(candidato)
    );

}

// ========================================
// CARREGAR PERFIL
// ========================================

export function carregarPerfil() {

    const perfil = localStorage.getItem(CHAVE);

    if (!perfil) {
        return null;
    }

    return JSON.parse(perfil);

}

// ========================================
// LIMPAR PERFIL
// ========================================

export function limparPerfil() {

    localStorage.removeItem(CHAVE);

}