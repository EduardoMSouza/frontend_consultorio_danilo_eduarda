// services/fila-espera-espera.service.ts


import {FilaEsperaRequest, FilaEsperaResponse, StatusFila} from "@/models/agenda/fila-espera.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class FilaEsperaService {
    private static baseUrl = `${API_URL}/api/fila-espera`;

    static async criar(request: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar entrada na fila-espera de espera');
        return response.json();
    }

    static async atualizar(id: number, request: FilaEsperaRequest): Promise<FilaEsperaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar fila-espera de espera');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<FilaEsperaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Entrada na fila-espera não encontrada');
        return response.json();
    }

    static async listarTodas(): Promise<FilaEsperaResponse[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error('Erro ao listar fila-espera de espera');
        return response.json();
    }

    static async listarPorStatus(status: StatusFila): Promise<FilaEsperaResponse[]> {
        const response = await fetch(`${this.baseUrl}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar por status');
        return response.json();
    }

    static async listarPorPaciente(pacienteId: number): Promise<FilaEsperaResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}`);
        if (!response.ok) throw new Error('Erro ao listar fila-espera do paciente');
        return response.json();
    }

    static async listarPorDentista(dentistaId: number): Promise<FilaEsperaResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}`);
        if (!response.ok) throw new Error('Erro ao listar fila-espera do dentista');
        return response.json();
    }

    static async listarAtivas(): Promise<FilaEsperaResponse[]> {
        const response = await fetch(`${this.baseUrl}/ativas`);
        if (!response.ok) throw new Error('Erro ao listar filas ativas');
        return response.json();
    }

    static async notificar(id: number): Promise<FilaEsperaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/notificar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao notificar paciente');
        return response.json();
    }

    static async converterEmAgendamento(id: number, agendamentoId: number): Promise<FilaEsperaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/converter?agendamentoId=${agendamentoId}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao converter em agendamento');
        return response.json();
    }

    static async cancelar(id: number): Promise<FilaEsperaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/cancelar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao cancelar fila-espera');
        return response.json();
    }

    static async expirarFilasAntigas(dataLimite: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/expirar?dataLimite=${dataLimite}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Erro ao expirar filas antigas');
    }

    static async deletar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar fila-espera');
    }
}