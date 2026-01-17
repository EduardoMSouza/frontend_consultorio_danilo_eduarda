import type { FilaEsperaResponse, FilaEsperaFiltros } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class ListarFilasEsperaUseCase {
    async executar(filtros?: FilaEsperaFiltros): Promise<FilaEsperaResponse[]> {
        if (filtros?.status) {
            return FilaEsperaService.listarPorStatus(filtros.status);
        }
        if (filtros?.pacienteId) {
            return FilaEsperaService.listarPorPaciente(filtros.pacienteId);
        }
        if (filtros?.dentistaId) {
            return FilaEsperaService.listarPorDentista(filtros.dentistaId);
        }
        return FilaEsperaService.listarAtivas();
    }
}
