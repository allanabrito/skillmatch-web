// ========================================
// LIMPAR RESULTADOS
// ========================================

export function limparResultados() {

    document.getElementById("vagas").innerHTML = "";
    document.getElementById("melhor-vaga").innerHTML = "";

}

// ========================================
// RENDERIZAR VAGAS
// ========================================

export function renderizarVagas(resultados) {

    const area = document.getElementById("vagas");

    area.innerHTML = "";

    resultados.forEach(resultado => {

        const card = document.createElement("article");

        card.className = "card-vaga";

        card.innerHTML = `
            <h3>${resultado.vaga.cargo}</h3>

            <p><strong>Empresa:</strong> ${resultado.vaga.empresa}</p>

            <p><strong>Modalidade:</strong> ${resultado.vaga.modalidade}</p>

            <p><strong>Salário:</strong> R$ ${resultado.vaga.salario}</p>

            <p><strong>Compatibilidade:</strong> ${resultado.porcentagem}%</p>

            <p><strong>Classificação:</strong> ${resultado.classificacao}</p>

            <p><strong>Habilidades encontradas:</strong><br>
            ${resultado.habilidadesEncontradas.join(", ") || "Nenhuma"}</p>

            <p><strong>Habilidades faltantes:</strong><br>
            ${resultado.habilidadesFaltantes.join(", ") || "Nenhuma"}</p>
        `;

        area.appendChild(card);

    });

}

// ========================================
// MELHOR VAGA
// ========================================

export function renderizarMelhorVaga(vaga, recomendacao) {

    const area = document.getElementById("melhor-vaga");

    area.innerHTML = "";

    if (!vaga) {

        area.innerHTML = `
            <h2>Melhor vaga</h2>
            <p>Nenhuma vaga encontrada.</p>
        `;

        return;
    }

    area.innerHTML = `
        <h2>🏆 Melhor vaga para você</h2>

        <article class="card-vaga destaque">

            <h3>${vaga.cargo}</h3>

            <p><strong>Empresa:</strong> ${vaga.empresa}</p>

            <p><strong>Modalidade:</strong> ${vaga.modalidade}</p>

            <p><strong>Salário:</strong> R$ ${vaga.salario}</p>

            <hr>

            <p><strong>Recomendação de estudo:</strong></p>

            <p>${recomendacao}</p>

        </article>
    `;

}