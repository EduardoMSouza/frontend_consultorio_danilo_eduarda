import type { FilaEsperaRequest, FilaEsperaResponse } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaValidator } from '../../validators/FilaEsperaValidator';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class AtualizarFilaEsperaUseCase {
    async executar(id: number, request: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const errors = FilaEsperaValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return FilaEsperaService.atualizar(id, request);
    }
}