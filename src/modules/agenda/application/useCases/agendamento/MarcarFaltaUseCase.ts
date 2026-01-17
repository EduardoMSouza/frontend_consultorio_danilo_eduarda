import type { AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class MarcarFaltaUseCase {
    async executar(id: number, usuario: string): Promise<AgendamentoResponse> {
        return AgendamentoService.marcarFalta(id, usuario);
    }
}