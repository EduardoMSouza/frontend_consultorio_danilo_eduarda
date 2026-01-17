import type { FilaEsperaResponse } from '../../dto/FilaEsperaDTOs';
import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class NotificarFilaEsperaUseCase {
    async executar(id: number): Promise<FilaEsperaResponse> {
        return FilaEsperaService.notificar(id);
    }
}