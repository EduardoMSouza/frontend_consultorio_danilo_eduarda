// models/agendamento.model.ts
export enum StatusAgendamento {
    PENDENTE = 'PENDENTE',
    CONFIRMADO = 'CONFIRMADO',
    EM_ATENDIMENTO = 'EM_ATENDIMENTO',
    CONCLUIDO = 'CONCLUIDO',
    CANCELADO = 'CANCELADO',
    FALTA = 'FALTA'
}

export enum TipoProcedimento {
    CONSULTA = 'CONSULTA',
    RETORNO = 'RETORNO',
    AVALIACAO = 'AVALIACAO',
    LIMPEZA = 'LIMPEZA',
    EXTRACAO = 'EXTRACAO',
    RESTAURACAO = 'RESTAURACAO',
    CANAL = 'CANAL',
    PROTESE = 'PROTESE',
    ORTODONTIA = 'ORTODONTIA',
    URGENCIA = 'URGENCIA',
    OUTROS = 'OUTROS'
}

export interface AgendamentoRequest {
    dentistaId: number;
    pacienteId: number;
    dataConsulta: string;
    horaInicio: string;
    horaFim: string;
    status?: StatusAgendamento;
    tipoProcedimento?: TipoProcedimento;
    observacoes?: string;
    valorConsulta?: number;
    criadoPor?: string;
}

export interface AgendamentoResponse {
    id: number;
    dentistaId: number;
    nomeDentista: string;
    pacienteId: number;
    nomePaciente: string;
    dataConsulta: string;
    horaInicio: string;
    horaFim: string;
    status: StatusAgendamento;
    tipoProcedimento?: TipoProcedimento;
    observacoes?: string;
    valorConsulta?: number;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
    criadoPor?: string;
    atualizadoPor?: string;
    canceladoPor?: string;
    canceladoEm?: string;
    motivoCancelamento?: string;
    confirmadoEm?: string;
    lembreteEnviado: boolean;
    lembreteEnviadoEm?: string;
    duracaoEmMinutos?: number;
    podeSerEditado: boolean;
    podeSerCancelado: boolean;
    finalizado: boolean;
    consultaPassada: boolean;
    hoje: boolean;
}