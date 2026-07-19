import { criarObjetosVagas } from "./motor.js";

// ================================
// CARREGAR VAGAS (FETCH)
// ================================

export async function carregarVagas() {
    try {

        const resposta = await fetch("./assets/dados/vagas.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar vagas.");
        }

        const vagas = await resposta.json();

        if (vagas.length === 0) {
            return [];
        }

        return criarObjetosVagas(vagas);

    } catch (erro) {
        console.error(erro);
        return [];
    }
}

// ================================
// LOCAL STORAGE
// ================================

const CHAVE = "perfil-candidato";

// Salvar perfil
export function salvarPerfil(candidato) {

    localStorage.setItem(
        CHAVE,
        JSON.stringify(candidato)
    );

}

// Carregar perfil
export function carregarPerfil() {

    const perfil = localStorage.getItem(CHAVE);

    if (!perfil) {
        return null;
    }

    return JSON.parse(perfil);

}

