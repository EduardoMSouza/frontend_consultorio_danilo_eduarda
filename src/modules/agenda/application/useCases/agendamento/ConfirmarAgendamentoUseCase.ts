import type { AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class ConfirmarAgendamentoUseCase {
    async executar(id: number, usuario: string): Promise<AgendamentoResponse> {
        return AgendamentoService.confirmar(id, usuario);
    }
}
