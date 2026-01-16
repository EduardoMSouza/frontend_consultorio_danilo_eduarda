// services/dentistas.service.ts
import { DentistaRequest, DentistaResponse, PageResponse } from '@/models/dentista.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class DentistaService {
    private static baseUrl = `${API_URL}/api/dentistas`;

    static async criar(request: DentistaRequest): Promise<DentistaResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar dentistas');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<DentistaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Dentista não encontrado');
        return response.json();
    }

    static async buscarPorCro(cro: string): Promise<DentistaResponse> {
        const response = await fetch(`${this.baseUrl}/cro/${cro}`);
        if (!response.ok) throw new Error('Dentista não encontrado');
        return response.json();
    }

    static async atualizar(id: number, request: DentistaRequest): Promise<DentistaResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar dentistas');
        return response.json();
    }

    static async deletar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao deletar dentistas');
    }

    static async listarTodos(page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await fetch(`${this.baseUrl}?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar dentistas');
        return response.json();
    }

    static async listarAtivos(page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await fetch(`${this.baseUrl}/ativos?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar dentistas ativos');
        return response.json();
    }

    static async buscarPorNome(nome: string, page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await fetch(`${this.baseUrl}/buscar/nome?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao buscar por nome');
        return response.json();
    }

    static async buscarPorTermo(termo: string, page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await fetch(`${this.baseUrl}/buscar?termo=${encodeURIComponent(termo)}&page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao buscar por termo');
        return response.json();
    }

    static async ativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/ativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao ativar dentistas');
    }

    static async desativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/desativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao desativar dentistas');
    }

    static async verificarEmail(email: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/email?email=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Erro ao verificar email');
        return response.json();
    }

    static async verificarCro(cro: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/cro?cro=${encodeURIComponent(cro)}`);
        if (!response.ok) throw new Error('Erro ao verificar CRO');
        return response.json();
    }
}