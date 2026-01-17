import { PacienteService } from '../../infrastructure/services/PacienteService';

export class DeletarPacienteUseCase {
    async executar(id: number): Promise<void> {
        // Opcional: verificar dependências antes de deletar
        return PacienteService.excluir(id);
    }
}