// src/modules/agenda/infrastructure/services/AgendamentoService.ts
import type { AgendamentoRequest, AgendamentoResponse, AgendamentoStats, StatusAgendamento } from '../../domain/types/agendamento.types';
import { apiService } from '@/services/api.service';

export class AgendamentoService {
    private static base = '/api/agendamentos';

    static async criar(r: AgendamentoRequest): Promise<AgendamentoResponse> {
        const res = await apiService.post<AgendamentoResponse>(this.base, r);
        return res.data;
    }

    static async atualizar(id: number, r: AgendamentoRequest): Promise<AgendamentoResponse> {
        const res = await apiService.put<AgendamentoResponse>(`${this.base}/${id}`, r);
        return res.data;
    }

    static async buscarPorId(id: number): Promise<AgendamentoResponse> {
        const res = await apiService.get<AgendamentoResponse>(`${this.base}/${id}`);
        return res.data;
    }

    static async listarTodos(): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(this.base);
        return res.data;
    }

    static async listarPorDentista(dentistaId: number): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/dentista/${dentistaId}`);
        return res.data;
    }

    static async listarPorPaciente(pacienteId: number): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/paciente/${pacienteId}`);
        return res.data;
    }

    static async listarPorData(data: string): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/data/${data}`);
        return res.data;
    }

    static async listarPorPeriodo(dataInicio: string, dataFim: string): Promise<AgendamentoResponse[]> {
        const params = new URLSearchParams({ dataInicio, dataFim });
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/periodo?${params}`);
        return res.data;
    }

    static async listarPorStatus(status: StatusAgendamento): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/status/${status}`);
        return res.data;
    }

    static async listarPorDentistaEData(dentistaId: number, data: string): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/dentista/${dentistaId}/data/${data}`);
        return res.data;
    }

    static async confirmar(id: number, usuario: string): Promise<AgendamentoResponse> {
        const res = await apiService.patch<AgendamentoResponse>(`${this.base}/${id}/confirmar?usuario=${encodeURIComponent(usuario)}`);
        return res.data;
    }

    static async iniciarAtendimento(id: number, usuario: string): Promise<AgendamentoResponse> {
        const res = await apiService.patch<AgendamentoResponse>(`${this.base}/${id}/iniciar-atendimento?usuario=${encodeURIComponent(usuario)}`);
        return res.data;
    }

    static async concluir(id: number, usuario: string): Promise<AgendamentoResponse> {
        const res = await apiService.patch<AgendamentoResponse>(`${this.base}/${id}/concluir?usuario=${encodeURIComponent(usuario)}`);
        return res.data;
    }

    static async cancelar(id: number, motivo: string, usuario: string): Promise<AgendamentoResponse> {
        const params = new URLSearchParams({ motivo, usuario });
        const res = await apiService.patch<AgendamentoResponse>(`${this.base}/${id}/cancelar?${params}`);
        return res.data;
    }

    static async marcarFalta(id: number, usuario: string): Promise<AgendamentoResponse> {
        const res = await apiService.patch<AgendamentoResponse>(`${this.base}/${id}/marcar-falta?usuario=${encodeURIComponent(usuario)}`);
        return res.data;
    }

    static async deletar(id: number): Promise<void> {
        await apiService.delete(`${this.base}/${id}`);
    }

    static async verificarDisponibilidade(
        dentistaId: number,
        data: string,
        horaInicio: string,
        horaFim: string
    ): Promise<boolean> {
        const params = new URLSearchParams({
            dentistaId: dentistaId.toString(),
            data,
            horaInicio,
            horaFim,
        });
        const res = await apiService.get<{ disponivel: boolean }>(`${this.base}/verificar-disponibilidade?${params}`);
        return res.data.disponivel;
    }

    static async buscarAgendamentosParaLembrete(data: string): Promise<AgendamentoResponse[]> {
        const res = await apiService.get<AgendamentoResponse[]>(`${this.base}/lembretes/${data}`);
        return res.data;
    }

    static async marcarLembreteEnviado(id: number): Promise<void> {
        await apiService.patch(`${this.base}/${id}/marcar-lembrete-enviado`);
    }
}
