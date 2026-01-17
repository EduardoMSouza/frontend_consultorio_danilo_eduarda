import type { AgendamentoHistoricoResponse, TipoAcao } from '../../domain/types/historico.types';
import { apiService } from '@/services/api.service';

export class HistoricoService {
    private static base = '/api/agendamentos/historico';

    static async buscarPorAgendamento(agendamentoId: number): Promise<AgendamentoHistoricoResponse[]> {
        const res = await apiService.get<AgendamentoHistoricoResponse[]>(`${this.base}/agendamento/${agendamentoId}`);
        return res.data;
    }

    static async buscarPorUsuario(usuario: string): Promise<AgendamentoHistoricoResponse[]> {
        const res = await apiService.get<AgendamentoHistoricoResponse[]>(`${this.base}/usuario/${encodeURIComponent(usuario)}`);
        return res.data;
    }

    static async buscarPorAcao(acao: TipoAcao): Promise<AgendamentoHistoricoResponse[]> {
        const res = await apiService.get<AgendamentoHistoricoResponse[]>(`${this.base}/acao/${acao}`);
        return res.data;
    }

    static async buscarPorPeriodo(inicio: string, fim: string): Promise<AgendamentoHistoricoResponse[]> {
        const params = new URLSearchParams({ inicio, fim });
        const res = await apiService.get<AgendamentoHistoricoResponse[]>(`${this.base}/periodo?${params}`);
        return res.data;
    }
}