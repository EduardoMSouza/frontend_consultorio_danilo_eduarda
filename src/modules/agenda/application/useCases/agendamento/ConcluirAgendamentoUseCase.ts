import type { AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class ConcluirAgendamentoUseCase {
    async executar(id: number, usuario: string): Promise<AgendamentoResponse> {
        return AgendamentoService.concluir(id, usuario);
    }
}