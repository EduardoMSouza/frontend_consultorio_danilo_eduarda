import type { AgendamentoHistoricoResponse, TipoAcao } from '../../dto/HistoricoDTOs';
import { HistoricoService } from '../../../infrastructure/services/HistoricoService';

export class BuscarHistoricoUseCase {
    async porAgendamento(agendamentoId: number): Promise<AgendamentoHistoricoResponse[]> {
        return HistoricoService.buscarPorAgendamento(agendamentoId);
    }

    async porUsuario(usuario: string): Promise<AgendamentoHistoricoResponse[]> {
        return HistoricoService.buscarPorUsuario(usuario);
    }

    async porAcao(acao: TipoAcao): Promise<AgendamentoHistoricoResponse[]> {
        return HistoricoService.buscarPorAcao(acao);
    }

    async porPeriodo(inicio: string, fim: string): Promise<AgendamentoHistoricoResponse[]> {
        return HistoricoService.buscarPorPeriodo(inicio, fim);
    }
}
