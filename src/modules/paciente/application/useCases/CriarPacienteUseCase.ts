import { PacienteRequest, PacienteResponse } from '../dto/PacienteDTO';
import { PacienteValidator } from '../validators/PacienteValidator';
import { PacienteService } from '../../infrastructure/services/PacienteService';

export class CriarPacienteUseCase {
    async executar(request: PacienteRequest): Promise<PacienteResponse> {
        const errors = PacienteValidator.validate(request);
        if (errors) throw { fieldErrors: errors };

        const emailExists = await PacienteService.verificarEmail(request.dadosBasicos.email || '');
        if (emailExists) throw { message: 'Email já cadastrado' };

        const cpfExists = await PacienteService.verificarCpf(request.dadosBasicos.cpf || '');
        if (cpfExists) throw { message: 'CPF já cadastrado' };

        return PacienteService.criar(request);
    }
}