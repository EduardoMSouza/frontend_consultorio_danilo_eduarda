import { PacienteRequest, PacienteResponse } from '../dto/PacienteDTO';
import { PacienteValidator } from '../validators/PacienteValidator';
import { PacienteService } from '../../infrastructure/services/PacienteService';

export class AtualizarPacienteUseCase {
    async executar(id: number, request: PacienteRequest): Promise<PacienteResponse> {
        const errors = PacienteValidator.validate(request);
        if (errors) throw { fieldErrors: errors };

        const atual = await PacienteService.buscarPorId(id);

        if (request.dadosBasicos.email !== atual.dadosBasicos.email) {
            const emailExists = await PacienteService.verificarEmail(request.dadosBasicos.email || '');
            if (emailExists) throw { message: 'Email já cadastrado para outro paciente' };
        }

        if (request.dadosBasicos.cpf !== atual.dadosBasicos.cpf) {
            const cpfExists = await PacienteService.verificarCpf(request.dadosBasicos.cpf || '');
            if (cpfExists) throw { message: 'CPF já cadastrado para outro paciente' };
        }

        return PacienteService.atualizar(id, request);
    }
}