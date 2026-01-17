import { DentistaService } from '../../infrastructure/services/DentistaService';

export class AlternarStatusUseCase {
    constructor(private service: typeof DentistaService = DentistaService) {}

    async executar(id: number, ativar: boolean): Promise<void> {
        return ativar
            ? this.service.ativar(id)
            : this.service.desativar(id);
    }
}