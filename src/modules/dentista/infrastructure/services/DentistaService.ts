// services/dentista.service.ts - VERSÃO CORRIGIDA

import {apiService} from "@/services/api.service";
import {DentistaRequest, DentistaResponse} from "../../application/dto/DentistaDTOs";
import {PageResponse} from "@/models/user.type";


export class DentistaService {
    private static baseUrl = '/api/dentistas';

    static async criar(request: DentistaRequest): Promise<DentistaResponse> {
        const response = await apiService.post<DentistaResponse>(this.baseUrl, request);
        console.log(response.data, "erro na criação sei la dog")
        return response.data;
    }

    static async buscarPorId(id: number): Promise<DentistaResponse> {
        const response = await apiService.get<DentistaResponse>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async buscarPorCro(cro: string): Promise<DentistaResponse> {
        const response = await apiService.get<DentistaResponse>(`${this.baseUrl}/cro/${cro}`);
        return response.data;
    }

    static async atualizar(id: number, request: DentistaRequest): Promise<DentistaResponse> {
        const response = await apiService.put<DentistaResponse>(`${this.baseUrl}/${id}`, request);
        return response.data;
    }

    static async deletar(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }

    static async listarTodos(page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await apiService.get<PageResponse<DentistaResponse>>(
            `${this.baseUrl}?page=${page}&size=${size}`
        );
        return response.data;
    }

    static async listarAtivos(page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await apiService.get<PageResponse<DentistaResponse>>(
            `${this.baseUrl}/ativos?page=${page}&size=${size}`
        );
        return response.data;
    }

    static async buscarPorNome(nome: string, page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await apiService.get<PageResponse<DentistaResponse>>(
            `${this.baseUrl}/buscar/nome?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}`
        );
        return response.data;
    }

    static async buscarPorTermo(termo: string, page = 0, size = 10): Promise<PageResponse<DentistaResponse>> {
        const response = await apiService.get<PageResponse<DentistaResponse>>(
            `${this.baseUrl}/buscar?termo=${encodeURIComponent(termo)}&page=${page}&size=${size}`
        );
        return response.data;
    }

    static async ativar(id: number): Promise<void> {
        await apiService.patch(`${this.baseUrl}/${id}/ativar`);
    }

    static async desativar(id: number): Promise<void> {
        await apiService.patch(`${this.baseUrl}/${id}/desativar`);
    }

    static async verificarEmail(email: string): Promise<boolean> {
        const response = await apiService.get<boolean>(
            `${this.baseUrl}/verificar/email?email=${encodeURIComponent(email)}`
        );
        return response.data;
    }

    static async verificarCro(cro: string): Promise<boolean> {
        const response = await apiService.get<boolean>(
            `${this.baseUrl}/verificar/cro?cro=${encodeURIComponent(cro)}`
        );
        return response.data;
    }
}