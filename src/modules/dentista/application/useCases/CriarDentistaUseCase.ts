import { DentistaRequest, DentistaResponse } from '../dto/DentistaDTOs';
import { DentistaValidator } from '../validators/DentistaValidator';
import { DentistaService } from '../../infrastructure/services/DentistaService';

export class CriarDentistaUseCase {
    constructor(private service: typeof DentistaService = DentistaService) {}

    async executar(request: DentistaRequest): Promise<DentistaResponse> {
        const errors = DentistaValidator.validate(request);
        if (errors) throw { fieldErrors: errors };

        // opcional: garante uniqueness antes de inserir
        const emailExists = await this.service.verificarEmail(request.email);
        if (emailExists) throw { message: 'Email já cadastrado' };

        const croExists = await this.service.verificarCro(request.cro);
        if (croExists) throw { message: 'CRO já cadastrado' };

        return this.service.criar(request);
    }
}