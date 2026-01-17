import type { AgendamentoRequest, AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoValidator } from '../../validators/AgendamentoValidator';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class AtualizarAgendamentoUseCase {
    async executar(id: number, request: AgendamentoRequest): Promise<AgendamentoResponse> {
        const errors = AgendamentoValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return AgendamentoService.atualizar(id, request);
    }
}
