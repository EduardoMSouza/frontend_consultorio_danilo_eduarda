import type { PageResponse, UserResponse, UserFiltros } from '../dto/UserDTOs';
import { UserService } from '../../infrastructure/services/UserService';

export class ListarUsersUseCase {
    async executar(page: number, size: number, filtros?: UserFiltros): Promise<PageResponse<UserResponse>> {
        if (filtros?.termo) return UserService.buscarPorTermo(filtros.termo, page, size);
        if (filtros?.ativo !== undefined) return UserService.listarPorStatus(filtros.ativo, page, size);
        if (filtros?.role) return UserService.listarPorRole(filtros.role, page, size);
        return UserService.listarTodos(page, size);
    }
}