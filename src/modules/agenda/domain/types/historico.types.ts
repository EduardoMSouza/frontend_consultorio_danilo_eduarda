import {StatusAgendamento} from "@/models/agenda/agendamento.type";

export enum TipoAcao {
    CRIACAO = 'CRIACAO',
    ATUALIZACAO = 'ATUALIZACAO',
    CONFIRMACAO = 'CONFIRMACAO',
    INICIO_ATENDIMENTO = 'INICIO_ATENDIMENTO',
    CONCLUSAO = 'CONCLUSAO',
    CANCELAMENTO = 'CANCELAMENTO',
    FALTA = 'FALTA',
    EXCLUSAO = 'EXCLUSAO'
}

export interface AgendamentoHistoricoResponse {
    id: number;
    agendamentoId: number;
    acao: TipoAcao;
    statusAnterior?: StatusAgendamento;
    statusNovo?: StatusAgendamento;
    usuarioResponsavel: string;
    descricao: string;
    detalhes?: string;
    dataHora: string;
    ipOrigem?: string;
}
