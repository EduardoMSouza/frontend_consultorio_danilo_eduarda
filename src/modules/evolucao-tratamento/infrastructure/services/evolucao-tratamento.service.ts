import type {
  EvolucaoTratamentoRequest,
  EvolucaoTratamentoResponse,
  EvolucaoTratamentoStats,
  PageResponse,
} from "@/modules/evolucao-tratamento";
import { apiService } from "@/services/api.service";

export class EvolucaoTratamentoService {
  private static base = "/api/evolucoes-tratamento";

  /* ---------- CRUD ---------- */
  static async criar(
    r: EvolucaoTratamentoRequest
  ): Promise<EvolucaoTratamentoResponse> {
    const res = await apiService.post<EvolucaoTratamentoResponse>(this.base, r);
    return res.data;
  }

  static async atualizar(
    id: number,
    r: EvolucaoTratamentoRequest
  ): Promise<EvolucaoTratamentoResponse> {
    const res = await apiService.put<EvolucaoTratamentoResponse>(
      `${this.base}/${id}`,
      r
    );
    return res.data;
  }

  static async deletar(id: number): Promise<void> {
    await apiService.delete(`${this.base}/${id}`);
  }

  /* ---------- LISTAGENS ---------- */
  static async listarTodos(
    page = 0,
    size = 20
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    const res = await apiService.get<PageResponse<EvolucaoTratamentoResponse>>(
      `${this.base}?page=${page}&size=${size}`
    );
    return res.data;
  }

  static async listarPorPaciente(
    pacienteId: number,
    page = 0,
    size = 20
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    const res = await apiService.get<PageResponse<EvolucaoTratamentoResponse>>(
      `${this.base}/paciente/${pacienteId}?page=${page}&size=${size}`
    );
    return res.data;
  }

  static async listarPorDentista(
    dentistaId: number,
    page = 0,
    size = 20
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    const res = await apiService.get<PageResponse<EvolucaoTratamentoResponse>>(
      `${this.base}/dentista/${dentistaId}?page=${page}&size=${size}`
    );
    return res.data;
  }

  static async listarUrgentes(
    page = 0,
    size = 20
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    const res = await apiService.get<PageResponse<EvolucaoTratamentoResponse>>(
      `${this.base}/urgentes?page=${page}&size=${size}`
    );
    return res.data;
  }

  static async listarComFiltros(
    filtros: Record<string, any>,
    page = 0,
    size = 20
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    const params = new URLSearchParams({
      ...filtros,
      page: String(page),
      size: String(size),
    });
    const res = await apiService.get<PageResponse<EvolucaoTratamentoResponse>>(
      `${this.base}/filtros?${params}`
    );
    return res.data;
  }

  /* ---------- AÇÕES ---------- */
  static async alternarStatus(id: number, ativar: boolean): Promise<void> {
    const endpoint = ativar ? `${id}/ativar` : `${id}/desativar`;
    await apiService.patch(`${this.base}/${endpoint}`);
  }

  static async marcarComoUrgente(
    id: number
  ): Promise<EvolucaoTratamentoResponse> {
    const res = await apiService.patch<EvolucaoTratamentoResponse>(
      `${this.base}/${id}/urgente`
    );
    return res.data;
  }

  static async agendarRetorno(
    id: number,
    dataRetorno: string,
    motivo: string
  ): Promise<EvolucaoTratamentoResponse> {
    const res = await apiService.patch<EvolucaoTratamentoResponse>(
      `${this.base}/${id}/agendar-retorno?dataRetorno=${dataRetorno}&motivo=${encodeURIComponent(
        motivo
      )}`
    );
    return res.data;
  }

  /* ---------- STATS ---------- */
  static async estatisticas(): Promise<EvolucaoTratamentoStats> {
    const res = await apiService.get<EvolucaoTratamentoStats>(
      `${this.base}/estatisticas/status`
    );
    return res.data;
  }
}