import { PacienteService } from '../../infrastructure/services/PacienteService';

export class AlternarStatusPacienteUseCase {
    async executar(id: number, ativar: boolean): Promise<void> {
        return ativar ? PacienteService.ativar(id) : PacienteService.inativar(id);
    }
}