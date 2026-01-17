import type { PageResponse, PlanoDentalResponse, PlanoDentalFiltros } from '../dto/PlanoDentalDTOs';
import { PlanoDentalService } from '../../infrastructure/services/PlanoDentalService';

export class ListarPlanosUseCase {
    async executar(page: number, size: number, filtros?: PlanoDentalFiltros): Promise<PageResponse<PlanoDentalResponse>> {
        if (filtros?.pacienteId) return PlanoDentalService.listarPorPaciente(filtros.pacienteId, page, size);
        if (filtros?.dentistaId) return PlanoDentalService.listarPorDentista(filtros.dentistaId, page, size);
        if (filtros?.status) return PlanoDentalService.listarPorStatus(filtros.status, page, size);
        if (filtros?.urgente) return PlanoDentalService.listarUrgentes(page, size);
        return PlanoDentalService.listarTodos(page, size);
    }
}