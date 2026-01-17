import type { AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class IniciarAtendimentoUseCase {
    async executar(id: number, usuario: string): Promise<AgendamentoResponse> {
        return AgendamentoService.iniciarAtendimento(id, usuario);
    }
}
