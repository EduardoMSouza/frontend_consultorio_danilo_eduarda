import type { FilaEsperaResponse } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class CancelarFilaEsperaUseCase {
    async executar(id: number): Promise<FilaEsperaResponse> {
        return FilaEsperaService.cancelar(id);
    }
}