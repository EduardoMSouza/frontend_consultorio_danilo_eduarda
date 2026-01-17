import type { FilaEsperaRequest, FilaEsperaResponse } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaValidator } from '../../validators/FilaEsperaValidator';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class CriarFilaEsperaUseCase {
    async executar(request: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const errors = FilaEsperaValidator.validate(request);
        if (errors) throw { fieldErrors: errors };
        return FilaEsperaService.criar(request);
    }
}