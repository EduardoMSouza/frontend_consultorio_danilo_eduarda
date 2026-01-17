import type {
    PlanoDentalRequest,
    PlanoDentalResponse,
    PageResponse,
    PlanoDentalStats
} from '../../application/dto/PlanoDentalDTOs';
import {apiService} from "@/services/api.service";


export class PlanoDentalService {
    private static base = '/api/planos-dentais';

    /* ---------- CRUD ---------- */
    static async criar(r: PlanoDentalRequest): Promise<PlanoDentalResponse> {
        const res = await apiService.post<PlanoDentalResponse>(this.base, r);
        return res.data;
    }

    static async atualizar(id: number, r: PlanoDentalRequest): Promise<PlanoDentalResponse> {
        const res = await apiService.put<PlanoDentalResponse>(`${this.base}/${id}`, r);
        return res.data;
    }

    static async deletar(id: number): Promise<void> {
        await apiService.delete(`${this.base}/${id}`);
    }

    /* ---------- LISTAGENS ---------- */
    static async listarTodos(page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const res = await apiService.get<PageResponse<PlanoDentalResponse>>(`${this.base}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarPorStatus(status: string, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const res = await apiService.get<PageResponse<PlanoDentalResponse>>(`${this.base}/status/${status}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarPorPaciente(pacienteId: number, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const res = await apiService.get<PageResponse<PlanoDentalResponse>>(`${this.base}/paciente/${pacienteId}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarPorDentista(dentistaId: number, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const res = await apiService.get<PageResponse<PlanoDentalResponse>>(`${this.base}/dentista/${dentistaId}?page=${page}&size=${size}`);
        return res.data;
    }

    static async listarUrgentes(page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const res = await apiService.get<PageResponse<PlanoDentalResponse>>(`${this.base}/urgentes?page=${page}&size=${size}`);
        return res.data;
    }

    /* ---------- AÇÕES ---------- */
    static async concluir(id: number): Promise<PlanoDentalResponse> {
        const res = await apiService.patch<PlanoDentalResponse>(`${this.base}/${id}/concluir`);
        return res.data;
    }

    static async cancelar(id: number, motivo: string): Promise<PlanoDentalResponse> {
        const res = await apiService.patch<PlanoDentalResponse>(`${this.base}/${id}/cancelar?motivo=${encodeURIComponent(motivo)}`);
        return res.data;
    }

    static async aplicarDesconto(id: number, desconto: number): Promise<PlanoDentalResponse> {
        const res = await apiService.patch<PlanoDentalResponse>(`${this.base}/${id}/desconto?desconto=${desconto}`);
        return res.data;
    }

    static async alternarStatus(id: number, ativar: boolean): Promise<void> {
        const endpoint = ativar ? `${id}/ativar` : `${id}/desativar`;
        await apiService.patch(`${this.base}/${endpoint}`);
    }

    /* ---------- STATS ---------- */
    static async estatisticas(): Promise<PlanoDentalStats> {
        const res = await apiService.get<PlanoDentalStats>(`${this.base}/estatisticas/status`);
        return res.data;
    }
}