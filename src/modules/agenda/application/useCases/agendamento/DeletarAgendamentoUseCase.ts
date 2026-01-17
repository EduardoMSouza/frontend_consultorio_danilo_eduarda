import { AgendamentoService } from '../../../infrastructure/services/AgendamentoService';

export class DeletarAgendamentoUseCase {
    async executar(id: number): Promise<void> {
        await AgendamentoService.deletar(id);
    }
}