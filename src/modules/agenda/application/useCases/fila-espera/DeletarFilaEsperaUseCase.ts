import { FilaEsperaService } from '../../../infrastructure/services/FilaEsperaService';

export class DeletarFilaEsperaUseCase {
    async executar(id: number): Promise<void> {
        await FilaEsperaService.deletar(id);
    }
}
