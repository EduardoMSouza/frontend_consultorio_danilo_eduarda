// services/agendamento.service.ts
import {
    AgendamentoRequest,
    AgendamentoResponse,
    StatusAgendamento,
} from '@/models/agendamento.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class AgendamentoService {
    private static baseUrl = `${API_URL}/api/agendamentos`;

    static async criar(request: AgendamentoRequest): Promise<AgendamentoResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar agendamento');
        return response.json();
    }

    static async atualizar(id: number, request: AgendamentoRequest): Promise<AgendamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar agendamento');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<AgendamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Agendamento não encontrado');
        return response.json();
    }

    static async listarTodos(): Promise<AgendamentoResponse[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error('Erro ao listar agendamentos');
        return response.json();
    }

    static async listarPorDentista(dentistaId: number): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}`);
        if (!response.ok) throw new Error('Erro ao listar agendamentos do dentista');
        return response.json();
    }

    static async listarPorPaciente(pacienteId: number): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}`);
        if (!response.ok) throw new Error('Erro ao listar agendamentos do paciente');
        return response.json();
    }

    static async listarPorData(data: string): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/data/${data}`);
        if (!response.ok) throw new Error('Erro ao listar agendamentos por data');
        return response.json();
    }

    static async listarPorPeriodo(dataInicio: string, dataFim: string): Promise<AgendamentoResponse[]> {
        const response = await fetch(
            `${this.baseUrl}/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`
        );
        if (!response.ok) throw new Error('Erro ao listar agendamentos por período');
        return response.json();
    }

    static async listarPorStatus(status: StatusAgendamento): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar agendamentos por status');
        return response.json();
    }

    static async listarPorDentistaEData(dentistaId: number, data: string): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}/data/${data}`);
        if (!response.ok) throw new Error('Erro ao listar agendamentos');
        return response.json();
    }

    static async confirmar(id: number, usuario: string): Promise<AgendamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/confirmar?usuario=${encodeURIComponent(usuario)}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao confirmar agendamento');
        return response.json();
    }

    static async iniciarAtendimento(id: number, usuario: string): Promise<AgendamentoResponse> {
        const response = await fetch(
            `${this.baseUrl}/${id}/iniciar-atendimento?usuario=${encodeURIComponent(usuario)}`,
            { method: 'PATCH' }
        );
        if (!response.ok) throw new Error('Erro ao iniciar atendimento');
        return response.json();
    }

    static async concluir(id: number, usuario: string): Promise<AgendamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/concluir?usuario=${encodeURIComponent(usuario)}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao concluir agendamento');
        return response.json();
    }

    static async cancelar(id: number, motivo: string, usuario: string): Promise<AgendamentoResponse> {
        const response = await fetch(
            `${this.baseUrl}/${id}/cancelar?motivo=${encodeURIComponent(motivo)}&usuario=${encodeURIComponent(usuario)}`,
            { method: 'PATCH' }
        );
        if (!response.ok) throw new Error('Erro ao cancelar agendamento');
        return response.json();
    }

    static async marcarFalta(id: number, usuario: string): Promise<AgendamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/marcar-falta?usuario=${encodeURIComponent(usuario)}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao marcar falta');
        return response.json();
    }

    static async deletar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar agendamento');
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
        const response = await fetch(`${this.baseUrl}/verificar-disponibilidade?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao verificar disponibilidade');
        const result = await response.json();
        return result.disponivel;
    }

    static async buscarAgendamentosParaLembrete(data: string): Promise<AgendamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/lembretes/${data}`);
        if (!response.ok) throw new Error('Erro ao buscar agendamentos para lembrete');
        return response.json();
    }

    static async marcarLembreteEnviado(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/marcar-lembrete-enviado`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao marcar lembrete como enviado');
    }
}