import type {
    EstatisticasContagem,
    PacienteRequest,
    PacienteResponse,
    PacienteResumoResponse,
    PageResponse,
} from '@/modules/paciente/domain/types/paciente.types';
import {apiService} from "@/services/api.service";


export class PacienteService {
    private static baseUrl = '/api/pacientes';

    /* ====== CRUD ====== */
    static async criar(request: PacienteRequest): Promise<PacienteResponse> {
        const { data } = await apiService.post<PacienteResponse>(this.baseUrl, request);
        return data;
    }

    static async buscarPorId(id: number): Promise<PacienteResponse> {
        const { data } = await apiService.get<PacienteResponse>(`${this.baseUrl}/${id}`);
        return data;
    }

    static async atualizar(id: number, request: PacienteRequest): Promise<PacienteResponse> {
        const { data } = await apiService.put<PacienteResponse>(`${this.baseUrl}/${id}`, request);
        return data;
    }

    static async excluir(id: number): Promise<void> {
        await apiService.delete(`${this.baseUrl}/${id}`);
    }

    static async ativar(id: number): Promise<void> {
        await apiService.patch(`${this.baseUrl}/${id}/ativar`);
    }

    static async inativar(id: number): Promise<void> {
        await apiService.patch(`${this.baseUrl}/${id}/inativar`);
    }

    /* ====== LISTAGENS ====== */
    static async listarPaginado(page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const { data } = await apiService.get<PageResponse<PacienteResumoResponse>>(
            `${this.baseUrl}/paginado?page=${page}&size=${size}`
        );
        return data;
    }

    static async listarAtivosPaginado(page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const { data } = await apiService.get<PageResponse<PacienteResumoResponse>>(
            `${this.baseUrl}/ativos/paginado?page=${page}&size=${size}`
        );
        return data;
    }

    static async buscarPorNomePaginado(nome: string, page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const { data } = await apiService.get<PageResponse<PacienteResumoResponse>>(
            `${this.baseUrl}/buscar/nome/paginado?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}`
        );
        return data;
    }

    static async buscarPorCpfPaginado(cpf: string, page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const { data } = await apiService.get<PageResponse<PacienteResumoResponse>>(
            `${this.baseUrl}/buscar/cpf/paginado?cpf=${encodeURIComponent(cpf)}&page=${page}&size=${size}`
        );
        return data;
    }

    static async buscarPorConvenioPaginado(convenio: string, page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const { data } = await apiService.get<PageResponse<PacienteResumoResponse>>(
            `${this.baseUrl}/buscar/convenio/${encodeURIComponent(convenio)}/paginado?page=${page}&size=${size}`
        );
        return data;
    }

    /* ====== UTILITÁRIOS ====== */
    static async listarConveniosDistintos(): Promise<string[]> {
        const { data } = await apiService.get<string[]>(`${this.baseUrl}/convenios`);
        return data;
    }

    static async buscarAniversariantesDoMes(mes: number): Promise<PacienteResponse[]> {
        const { data } = await apiService.get<PacienteResponse[]>(`${this.baseUrl}/aniversariantes/mes/${mes}`);
        return data;
    }

    static async getEstatisticasContagem(): Promise<EstatisticasContagem> {
        const { data } = await apiService.get<EstatisticasContagem>(`${this.baseUrl}/estatisticas/contagem`);
        return data;
    }

    /* ====== VERIFICAÇÕES ====== */
    static async verificarEmail(email: string): Promise<boolean> {
        const { data } = await apiService.get<boolean>(`${this.baseUrl}/verificar/email/${encodeURIComponent(email)}`);
        return data;
    }

    static async verificarCpf(cpf: string): Promise<boolean> {
        const { data } = await apiService.get<boolean>(`${this.baseUrl}/verificar/cpf/${cpf}`);
        return data;
    }
}