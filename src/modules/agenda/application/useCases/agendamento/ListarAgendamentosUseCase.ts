import { AgendamentoFiltros } from '@/modules/agenda/domain/types/agendamento.types';
import { AgendamentoResponse } from '@/models/agenda/agendamento.type';
import { AgendamentoService } from '@/services/agenda/agendamento.service';

export class ListarAgendamentosUseCase {
    async executar(filtros?: AgendamentoFiltros): Promise<AgendamentoResponse[]> {
        // 1. Período + dentista (mais específico)
        if (filtros?.dataInicio && filtros?.dataFim && filtros?.dentistaId) {
            return AgendamentoService.listarPorPeriodoEDentista(
                filtros.dataInicio,
                filtros.dataFim,
                filtros.dentistaId
            );
        }

        // 2. Período
        if (filtros?.dataInicio && filtros?.dataFim) {
            return AgendamentoService.listarPorPeriodo(
                filtros.dataInicio,
                filtros.dataFim
            );
        }

        // 3. Dentista isolado
        if (filtros?.dentistaId) {
            return AgendamentoService.listarPorDentista(filtros.dentistaId);
        }

        // 4. Paciente
        if (filtros?.pacienteId) {
            return AgendamentoService.listarPorPaciente(filtros.pacienteId);
        }

        // 5. Status
        if (filtros?.status) {
            return AgendamentoService.listarPorStatus(filtros.status);
        }

        // 7. Sem filtros → lista tudo
        return AgendamentoService.listarTodos();
    }
}