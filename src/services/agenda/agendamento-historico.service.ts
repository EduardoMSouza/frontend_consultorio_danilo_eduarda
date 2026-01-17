// services/agendamento-historico.service.ts
import { AgendamentoHistoricoResponse, TipoAcao } from '@/models/agendamento-historico.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class AgendamentoHistoricoService {
    private static baseUrl = `${API_URL}/api/agendamentos/historico`;

    static async buscarPorAgendamento(agendamentoId: number): Promise<AgendamentoHistoricoResponse[]> {
        const response = await fetch(`${this.baseUrl}/agendamento/${agendamentoId}`);
        if (!response.ok) throw new Error('Erro ao buscar histórico do agendamento');
        return response.json();
    }

    static async buscarPorUsuario(usuario: string): Promise<AgendamentoHistoricoResponse[]> {
        const response = await fetch(`${this.baseUrl}/usuario/${encodeURIComponent(usuario)}`);
        if (!response.ok) throw new Error('Erro ao buscar histórico do usuário');
        return response.json();
    }

    static async buscarPorAcao(acao: TipoAcao): Promise<AgendamentoHistoricoResponse[]> {
        const response = await fetch(`${this.baseUrl}/acao/${acao}`);
        if (!response.ok) throw new Error('Erro ao buscar histórico por ação');
        return response.json();
    }

    static async buscarPorPeriodo(inicio: string, fim: string): Promise<AgendamentoHistoricoResponse[]> {
        const response = await fetch(`${this.baseUrl}/periodo?inicio=${inicio}&fim=${fim}`);
        if (!response.ok) throw new Error('Erro ao buscar histórico por período');
        return response.json();
    }
}