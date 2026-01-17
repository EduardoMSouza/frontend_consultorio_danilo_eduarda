import type { FilaEsperaResponse } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class ConverterFilaEsperaUseCase {
    async executar(id: number, agendamentoId: number): Promise<FilaEsperaResponse> {
        return FilaEsperaService.converterEmAgendamento(id, agendamentoId);
    }
}