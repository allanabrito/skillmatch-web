// ========================================
// MOTOR DO SKILLMATCH
// ========================================

export class Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade, stack) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos;
        this.salario = salario;
        this.modalidade = modalidade;
        this.stack = stack;
    }

    calcularCompatibilidade(candidato) {

        const habilidadesEncontradas = this.requisitos.filter(requisito =>
            candidato.habilidades.includes(requisito)
        );

        const habilidadesFaltantes = this.requisitos.filter(requisito =>
            !candidato.habilidades.includes(requisito)
        );

        const porcentagem = Math.round(
            (habilidadesEncontradas.length / this.requisitos.length) * 100
        );

        return {
            porcentagem,
            habilidadesEncontradas,
            habilidadesFaltantes,
            classificacao: classificarCompatibilidade(porcentagem)
        };
    }
}

// ========================================

export class VagaFrontEnd extends Vaga {

    constructor(
        id,
        empresa,
        cargo,
        requisitos,
        salario,
        modalidade,
        stack
    ) {

        super(
            id,
            empresa,
            cargo,
            requisitos,
            salario,
            modalidade,
            stack
        );

    }

    obterDescricao() {
        return `${this.cargo} | Stack: ${this.stack}`;
    }

}

// ========================================

export class Candidato {

    constructor(
        nome,
        area,
        habilidades,
        experienciaMeses
    ) {

        this.nome = nome;
        this.area = area;
        this.habilidades = habilidades;
        this.experienciaMeses = experienciaMeses;

    }

}

// ========================================
// CLASSIFICAÇÃO
// ========================================

export function classificarCompatibilidade(porcentagem) {

    if (porcentagem >= 80) {
        return "Alta";
    }

    if (porcentagem >= 50) {
        return "Média";
    }

    return "Baixa";

}
// ========================================
// CALCULAR MATCH
// ========================================

export function calcularMatch(candidato, vaga) {
    return vaga.calcularCompatibilidade(candidato);
}

// ========================================
// FILTRAR VAGAS
// ========================================

export function filtrarVagasPorNivel(candidato, vagas) {

    return vagas.filter(vaga =>
        vaga.modalidade === candidato.area ||
        candidato.area === "" ||
        vaga.modalidade === "Full Stack"
    );

}

// ========================================
// MELHOR VAGA
// ========================================

export function acharMelhorVaga(candidato, vagas) {

    return vagas.reduce((melhor, vaga) => {

        if (!melhor) return vaga;

        const matchAtual =
            vaga.calcularCompatibilidade(candidato).porcentagem;

        const matchMelhor =
            melhor.calcularCompatibilidade(candidato).porcentagem;

        return matchAtual > matchMelhor
            ? vaga
            : melhor;

    }, null);

}
// ========================================
// RECOMENDAÇÃO
// ========================================

export function recomendarEstudo(vaga, candidato) {

    const resultado = vaga.calcularCompatibilidade(candidato);

    if (resultado.habilidadesFaltantes.length === 0) {
        return "Você atende todos os requisitos da vaga.";
    }

    return `Estude: ${resultado.habilidadesFaltantes.join(", ")} ⁠`;

}
    // ========================================
// EXECUTAR ANÁLISE
// ========================================

export function executarAnalise(candidato, vagas, callback = null) {

    const resultados = vagas.map(vaga => {

        const compatibilidade = vaga.calcularCompatibilidade(candidato);

        return {
            vaga,
            ...compatibilidade
        };

    });

    const melhorVaga = acharMelhorVaga(candidato, vagas);

    const recomendacao = recomendarEstudo(melhorVaga, candidato);

    const resultadoFinal = {
        resultados,
        melhorVaga,
        recomendacao
    };

    if (callback) {callback(resultadoFinal);

    }

    return resultadoFinal;

}

// ========================================
// CONVERTER JSON EM OBJETOS
// ========================================

export function criarObjetosVagas(listaDeVagas) {

    return listaDeVagas.map(vaga =>
        new VagaFrontEnd(
            vaga.id,
            vaga.empresa,
            vaga.cargo,
            vaga.requisitos,
            vaga.salario,
            vaga.modalidade,
            vaga.stack
        )
    );

}