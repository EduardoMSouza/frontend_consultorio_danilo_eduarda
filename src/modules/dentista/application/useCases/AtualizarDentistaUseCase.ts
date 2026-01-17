import { DentistaRequest, DentistaResponse } from '../dto/DentistaDTOs';
import { DentistaValidator } from '../validators/DentistaValidator';
import { DentistaService } from '../../infrastructure/services/DentistaService';

export class AtualizarDentistaUseCase {
    constructor(private service: typeof DentistaService = DentistaService) {}

    async executar(id: number, request: DentistaRequest): Promise<DentistaResponse> {
        const errors = DentistaValidator.validate(request);
        if (errors) throw { fieldErrors: errors };

        // verifica se novo email ou CRO já pertencem a OUTRO dentista
        const atual = await this.service.buscarPorId(id);

        if (request.email !== atual.email) {
            const emailExists = await this.service.verificarEmail(request.email);
            if (emailExists) throw { message: 'Email já cadastrado para outro dentista' };
        }

        if (request.cro !== atual.cro) {
            const croExists = await this.service.verificarCro(request.cro);
            if (croExists) throw { message: 'CRO já cadastrado para outro dentista' };
        }

        return this.service.atualizar(id, request);
    }
}