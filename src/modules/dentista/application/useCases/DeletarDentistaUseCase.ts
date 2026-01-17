import { DentistaService } from '../../infrastructure/services/DentistaService';

export class DeletarDentistaUseCase {
    constructor(private service: typeof DentistaService = DentistaService) {}

    async executar(id: number): Promise<void> {
        // opcional: verificar se há dependências (consultas, etc.)
        return this.service.deletar(id);
    }
}