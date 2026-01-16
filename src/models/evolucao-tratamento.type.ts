// models/evolucao-tratamento.model.ts
export enum TipoEvolucao {
    AVALIACAO_INICIAL = 'AVALIACAO_INICIAL',
    CONSULTA_ROTINA = 'CONSULTA_ROTINA',
    PROCEDIMENTO_CIRURGICO = 'PROCEDIMENTO_CIRURGICO',
    URGENCIA = 'URGENCIA',
    RETORNO = 'RETORNO',
    MANUTENCAO = 'MANUTENCAO',
    ALTA = 'ALTA'
}

export interface EvolucaoTratamentoRequest {
    pacienteId: number;
    dentistaId: number;
    planoDentalId: number;
    dataEvolucao: string;
    tipoEvolucao: TipoEvolucao;
    titulo: string;
    descricao: string;
    procedimentosRealizados?: string;
    materiaisUtilizados?: string;
    medicamentosPrescritos?: string;
    observacoes?: string;
    recomendacoes?: string;
    doresQueixas?: string;
    proximaConsulta?: string;
    tempoConsultaMinutos?: number;
    urgente?: boolean;
    retornoNecessario?: boolean;
    assinaturaDentista?: string;
}

export interface EvolucaoTratamentoResponse {
    id: number;
    planoDentalId: number;
    planoDentalNome?: string;
    pacienteId: number;
    pacienteNome: string;
    dentistaId: number;
    dentistaNome: string;
    dataEvolucao: string;
    tipoEvolucao: TipoEvolucao;
    tipoEvolucaoDescricao: string;
    titulo: string;
    descricao: string;
    procedimentosRealizados?: string;
    materiaisUtilizados?: string;
    medicamentosPrescritos?: string;
    observacoes?: string;
    recomendacoes?: string;
    doresQueixas?: string;
    proximaConsulta?: string;
    tempoConsultaMinutos?: number;
    urgente: boolean;
    retornoNecessario: boolean;
    assinaturaDentista?: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export interface EvolucaoFiltros {
    pacienteId?: number;
    dentistaId?: number;
    planoDentalId?: number;
    dataInicio?: string;
    dataFim?: string;
    tipoEvolucao?: string;
    urgente?: boolean;
}