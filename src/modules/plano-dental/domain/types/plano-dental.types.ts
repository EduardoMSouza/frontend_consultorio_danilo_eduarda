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
    dataPrevista?: string; // ISO yyyy-MM-dd HH:mm:ss
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
    urgente?: boolean;
    observacoes?: string;
    motivoCancelamento?: string;
    dataPrevista?: string;
    dataRealizacao?: string;
    dataCancelamento?: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
}

export type StatusPlano = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export interface PlanoDentalFiltros {
    termo?: string;
    pacienteId?: number;
    dentistaId?: number;
    status?: StatusPlano;
    urgente?: boolean;
    ativo?: boolean;
}

export interface PlanoDentalStats {
    total: number;
    porStatus: Record<StatusPlano, number>;
    urgente: number;
    ativos: number;
    inativos: number;
}