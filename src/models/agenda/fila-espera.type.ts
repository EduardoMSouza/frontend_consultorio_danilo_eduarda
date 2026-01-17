// models/fila-espera-espera.model.ts
import {TipoProcedimento} from "@/models/agenda/agendamento.type";

export enum StatusFila {
    AGUARDANDO = 'AGUARDANDO',
    NOTIFICADO = 'NOTIFICADO',
    AGENDADO = 'AGENDADO',
    CANCELADO = 'CANCELADO',
    EXPIRADO = 'EXPIRADO'
}

export enum PeriodoPreferencial {
    MANHA = 'MANHA',
    TARDE = 'TARDE',
    NOITE = 'NOITE',
    QUALQUER = 'QUALQUER'
}

export interface FilaEsperaRequest {
    pacienteId: number;
    dentistaId?: number;
    tipoProcedimento?: TipoProcedimento;
    dataPreferencial?: string;
    horaInicioPreferencial?: string;
    horaFimPreferencial?: string;
    periodoPreferencial?: PeriodoPreferencial;
    observacoes?: string;
    prioridade?: number;
    aceitaQualquerHorario?: boolean;
    aceitaQualquerDentista?: boolean;
    criadoPor?: string;
}

export interface FilaEsperaResponse {
    id: number;
    pacienteId: number;
    nomePaciente: string;
    dentistaId?: number;
    nomeDentista?: string;
    tipoProcedimento?: TipoProcedimento;
    dataPreferencial?: string;
    horaInicioPreferencial?: string;
    horaFimPreferencial?: string;
    periodoPreferencial?: PeriodoPreferencial;
    observacoes?: string;
    prioridade: number;
    aceitaQualquerHorario: boolean;
    aceitaQualquerDentista: boolean;
    status: StatusFila;
    agendamentoId?: number;
    notificadoEm?: string;
    agendadoEm?: string;
    canceladoEm?: string;
    expiradoEm?: string;
    criadoEm: string;
    atualizadoEm: string;
    criadoPor?: string;
    atualizadoPor?: string;
    diasNaFila?: number;
}