import { UserService } from '../../infrastructure/services/UserService';
import {apiService} from "@/services/api.service";

export class AlternarStatusUserUseCase {
    async executar(id: number, ativar: boolean): Promise<void> {
        const endpoint = ativar ? `${id}/ativar` : `${id}/inativar`;
        await apiService.patch(`/api/users/${endpoint}`); // PATCH sem body
    }
}