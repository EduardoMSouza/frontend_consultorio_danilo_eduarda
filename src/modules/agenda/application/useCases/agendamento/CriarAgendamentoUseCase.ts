// src/modules/agenda/application/useCases/agendamento/CriarAgendamentoUseCase.ts
import type { AgendamentoRequest, AgendamentoResponse } from '../../dto/AgendamentoDTOs';
import { AgendamentoValidator } from '../../validators/AgendamentoValidator';
import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class CriarAgendamentoUseCase {
    async executar(request: AgendamentoRequest): Promise<AgendamentoResponse> {
        const errors = AgendamentoValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return AgendamentoService.criar(request);
    }
}