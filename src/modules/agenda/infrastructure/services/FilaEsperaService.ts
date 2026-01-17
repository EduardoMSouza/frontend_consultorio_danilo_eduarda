import type { FilaEsperaRequest, FilaEsperaResponse, FilaEsperaStats, StatusFila } from '../../domain/types/fila-espera.types';
import { apiService } from '@/services/api.service';

export class FilaEsperaService {
    private static base = '/api/fila-espera';

    static async criar(r: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const res = await apiService.post<FilaEsperaResponse>(this.base, r);
        return res.data;
    }

    static async atualizar(id: number, r: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const res = await apiService.put<FilaEsperaResponse>(`${this.base}/${id}`, r);
        return res.data;
    }

    static async buscarPorId(id: number): Promise<FilaEsperaResponse> {
        const res = await apiService.get<FilaEsperaResponse>(`${this.base}/${id}`);
        return res.data;
    }

    static async listarTodas(): Promise<FilaEsperaResponse[]> {
        const res = await apiService.get<FilaEsperaResponse[]>(this.base);
        return res.data;
    }

    static async listarPorStatus(status: StatusFila): Promise<FilaEsperaResponse[]> {
        const res = await apiService.get<FilaEsperaResponse[]>(`${this.base}/status/${status}`);
        return res.data;
    }

    static async listarPorPaciente(pacienteId: number): Promise<FilaEsperaResponse[]> {
        const res = await apiService.get<FilaEsperaResponse[]>(`${this.base}/paciente/${pacienteId}`);
        return res.data;
    }

    static async listarPorDentista(dentistaId: number): Promise<FilaEsperaResponse[]> {
        const res = await apiService.get<FilaEsperaResponse[]>(`${this.base}/dentista/${dentistaId}`);
        return res.data;
    }

    static async listarAtivas(): Promise<FilaEsperaResponse[]> {
        const res = await apiService.get<FilaEsperaResponse[]>(`${this.base}/ativas`);
        return res.data;
    }

    static async notificar(id: number): Promise<FilaEsperaResponse> {
        const res = await apiService.patch<FilaEsperaResponse>(`${this.base}/${id}/notificar`);
        return res.data;
    }

    static async converterEmAgendamento(id: number, agendamentoId: number): Promise<FilaEsperaResponse> {
        const res = await apiService.patch<FilaEsperaResponse>(`${this.base}/${id}/converter?agendamentoId=${agendamentoId}`);
        return res.data;
    }

    static async cancelar(id: number): Promise<FilaEsperaResponse> {
        const res = await apiService.patch<FilaEsperaResponse>(`${this.base}/${id}/cancelar`);
        return res.data;
    }

    static async expirarFilasAntigas(dataLimite: string): Promise<void> {
        await apiService.post(`${this.base}/expirar?dataLimite=${dataLimite}`);
    }

    static async deletar(id: number): Promise<void> {
        await apiService.delete(`${this.base}/${id}`);
    }
}
