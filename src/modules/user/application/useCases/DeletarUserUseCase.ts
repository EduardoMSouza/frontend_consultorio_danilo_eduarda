import { UserService } from '../../infrastructure/services/UserService';

export class DeletarUserUseCase {
    async executar(id: number): Promise<void> {
        await UserService.deletar(id);
    }
}