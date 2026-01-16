// models/planos-dentais.model.ts
export enum StatusPlano {
    PENDENTE = 'PENDENTE',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDO = 'CONCLUIDO',
    CANCELADO = 'CANCELADO'
}

export interface PlanoDentalRequest {
    pacienteId: number;
    dentistaId: number;
    dente: string;
    faceDente?: string;
    procedimento: string;
    codigoProcedimento?: string;
    valor: number;
    valorDesconto?: number;
    status?: StatusPlano;
    prioridade?: string;
    urgente?: boolean;
    observacoes?: string;
    dataPrevista?: string;
}

export interface PlanoDentalResponse {
    id: number;
    pacienteId: number;
    pacienteNome: string;
    dentistaId: number;
    dentistaNome: string;
    dente: string;
    faceDente?: string;
    procedimento: string;
    codigoProcedimento?: string;
    valor: number;
    valorDesconto?: number;
    valorFinal: number;
    status: StatusPlano;
    prioridade?: string;
    urgente: boolean;
    observacoes?: string;
    motivoCancelamento?: string;
    dataPrevista?: string;
    dataRealizacao?: string;
    dataCancelamento?: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export interface PlanoDentalFiltros {
    pacienteId?: number;
    dentistaId?: number;
    status?: StatusPlano;
    dente?: string;
    procedimento?: string;
    urgente?: boolean;
    ativo?: boolean;
    dataInicio?: string;
    dataFim?: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}