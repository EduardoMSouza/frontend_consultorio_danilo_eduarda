import {UserRequest, UserResponse, UserStats} from "@/modules/user/domain/types/user.types";
import {apiService} from "@/services/api.service";
import {PageResponse} from "@/modules/dentista/domain/types/dentista.types";

export class UserService {
    private static base = '/api/users';

    /* --------- CRUD --------- */
    static async criar(r: UserRequest): Promise<UserResponse> {
        const res = await apiService.post<UserResponse>(this.base, r);
        return res.data;
    }

    static async atualizar(id: number, r: UserRequest): Promise<UserResponse> {
        const res = await apiService.put<UserResponse>(`${this.base}/${id}`, r);
        return res.data;
    }

    static async deletar(id: number): Promise<void> {
        await apiService.delete(`${this.base}/${id}`);
    }

    /* --------- LISTAGENS --------- */
    static async listarTodos(page = 0, size = 20): Promise<PageResponse<UserResponse>> {
        const res = await apiService.get<PageResponse<UserResponse>>(`${this.base}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarPorStatus(ativo: boolean, page = 0, size = 20): Promise<PageResponse<UserResponse>> {
        const res = await apiService.get<PageResponse<UserResponse>>(`${this.base}/status/${ativo}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarPorRole(role: string, page = 0, size = 20): Promise<PageResponse<UserResponse>> {
        const res = await apiService.get<PageResponse<UserResponse>>(`${this.base}/role/${role}?page=${page}&size=${size}`);
        return res.data;
    }

    static async buscarPorTermo(termo?: string, page = 0, size = 20): Promise<PageResponse<UserResponse>> {
        const params = new URLSearchParams({ termo: termo || '', page: String(page), size: String(size) });
        const res = await apiService.get<PageResponse<UserResponse>>(`${this.base}/buscar?${params}`);
        return res.data;
    }

    /* --------- UTILS --------- */
    static async estatisticas(): Promise<UserStats> {
        const res = await apiService.get<UserStats>(`${this.base}/estatisticas`);
        return res.data;
    }

    static async buscarPorId(id: number): Promise<UserResponse> {
        const res = await apiService.get<UserResponse>(`${this.base}/${id}`);
        return res.data;
    }
}