import type { AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class CancelarAgendamentoUseCase {
    async executar(id: number, motivo: string, usuario: string): Promise<AgendamentoResponse> {
        if (!motivo.trim()) {
            throw { fieldErrors: { motivo: ['Motivo é obrigatório'] } };
        }
        return AgendamentoService.cancelar(id, motivo, usuario);
    }
}
