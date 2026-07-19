// ========================================
// LIMPAR RESULTADOS
// ========================================

export function limparResultados() {

    const area = document.getElementById("vagas");

    area.innerHTML = "";

}

// ========================================
// RENDERIZAR VAGAS
// ========================================

export function renderizarVagas(resultados) {

    const area = document.getElementById("vagas");

    area.innerHTML = "";

    resultados.forEach(resultado => {

        const card = document.createElement("article");

        card.classList.add("card-vaga");

        card.innerHTML = `
            <h3>${resultado.vaga.cargo}</h3>

            <p><strong>Empresa:</strong> ${resultado.vaga.empresa}</p>

            <p><strong>Compatibilidade:</strong> ${resultado.porcentagem}%</p>

            <p><strong>Classificação:</strong> ${resultado.classificacao}</p>

            <p><strong>Encontradas:</strong>
            ${resultado.habilidadesEncontradas.join(", ")}</p>

            <p><strong>Faltantes:</strong>
            ${resultado.habilidadesFaltantes.join(", ")}</p>
        `;

        area.appendChild(card);

    });

}

// ========================================
// MELHOR VAGA
// ========================================

export function renderizarMelhorVaga(vaga, recomendacao) {

    const area = document.getElementById("melhor-vaga");

    area.innerHTML = `
        <h2>Melhor vaga para você</h2>

        <h3>${vaga.cargo}</h3>

        <p>${vaga.empresa}</p>

        <p>${recomendacao}</p>
    `;

}