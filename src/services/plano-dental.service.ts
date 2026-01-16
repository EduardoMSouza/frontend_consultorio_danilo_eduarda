// services/planos-dentais.service.ts
import {
    PlanoDentalRequest,
    PlanoDentalResponse,
    StatusPlano,
    PlanoDentalFiltros,
    PageResponse,
} from '@/models/plano-dental.type';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class PlanoDentalService {
    private static baseUrl = `${API_URL}/api/planos-dentais`;

    static async criar(request: PlanoDentalRequest): Promise<PlanoDentalResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar plano dental');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Plano dental não encontrado');
        return response.json();
    }

    static async listarTodos(): Promise<PlanoDentalResponse[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarPaginado(page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const response = await fetch(`${this.baseUrl}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async atualizar(id: number, request: PlanoDentalRequest): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar plano');
        return response.json();
    }

    static async atualizarParcial(id: number, request: Partial<PlanoDentalRequest>): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar plano');
        return response.json();
    }

    static async desativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/desativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao desativar plano');
    }

    static async ativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/ativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao ativar plano');
    }

    static async excluir(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao excluir plano');
    }

    static async concluir(id: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/concluir`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao concluir plano');
        return response.json();
    }

    static async cancelar(id: number, motivo: string): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/cancelar?motivo=${encodeURIComponent(motivo)}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao cancelar plano');
        return response.json();
    }

    static async iniciar(id: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/iniciar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao iniciar plano');
        return response.json();
    }

    static async aplicarDesconto(id: number, desconto: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/desconto?desconto=${desconto}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao aplicar desconto');
        return response.json();
    }

    static async atualizarValor(id: number, valor: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/valor?valor=${valor}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao atualizar valor');
        return response.json();
    }

    static async marcarComoUrgente(id: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/urgente`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao marcar como urgente');
        return response.json();
    }

    static async removerUrgencia(id: number): Promise<PlanoDentalResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/remover-urgencia`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao remover urgência');
        return response.json();
    }

    static async listarPorPaciente(pacienteId: number): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}`);
        if (!response.ok) throw new Error('Erro ao listar planos do paciente');
        return response.json();
    }

    static async listarPorPacientePaginado(pacienteId: number, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar planos do paciente');
        return response.json();
    }

    static async listarPorDentista(dentistaId: number): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}`);
        if (!response.ok) throw new Error('Erro ao listar planos do dentista');
        return response.json();
    }

    static async listarPorDentistaPaginado(dentistaId: number, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar planos do dentista');
        return response.json();
    }

    static async listarPorPacienteEDentista(pacienteId: number, dentistaId: number): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/dentista/${dentistaId}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarPorStatus(status: StatusPlano): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar planos por status');
        return response.json();
    }

    static async listarPorStatusPaginado(status: StatusPlano, page = 0, size = 20): Promise<PageResponse<PlanoDentalResponse>> {
        const response = await fetch(`${this.baseUrl}/status/${status}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar planos por status');
        return response.json();
    }

    static async listarPorStatusEm(statuses: StatusPlano[]): Promise<PlanoDentalResponse[]> {
        const params = statuses.map(s => `statuses=${s}`).join('&');
        const response = await fetch(`${this.baseUrl}/status?${params}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarAtivosOrdenadosPorDataPrevista(pacienteId: number): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/ativos-ordenados`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarPorDataPrevistaEntre(inicio: string, fim: string): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/data-prevista?inicio=${inicio}&fim=${fim}`);
        if (!response.ok) throw new Error('Erro ao listar planos por data');
        return response.json();
    }

    static async listarUrgentes(): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/urgentes`);
        if (!response.ok) throw new Error('Erro ao listar planos urgentes');
        return response.json();
    }

    static async listarUrgentesPorStatus(status: StatusPlano): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/urgentes/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar planos urgentes');
        return response.json();
    }

    static async listarPorPacienteEStatus(pacienteId: number, status: StatusPlano): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarPorDentistaEStatus(dentistaId: number, status: StatusPlano): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async listarPorPacienteDentistaEStatus(pacienteId: number, dentistaId: number, status: StatusPlano): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/dentista/${dentistaId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao listar planos');
        return response.json();
    }

    static async buscarComFiltros(filtros: PlanoDentalFiltros): Promise<PlanoDentalResponse[]> {
        const params = new URLSearchParams();

        if (filtros.pacienteId) params.append('pacienteId', filtros.pacienteId.toString());
        if (filtros.dentistaId) params.append('dentistaId', filtros.dentistaId.toString());
        if (filtros.status) params.append('status', filtros.status);
        if (filtros.dente) params.append('dente', filtros.dente);
        if (filtros.procedimento) params.append('procedimento', filtros.procedimento);
        if (filtros.urgente !== undefined) params.append('urgente', filtros.urgente.toString());
        if (filtros.ativo !== undefined) params.append('ativo', filtros.ativo.toString());
        if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
        if (filtros.dataFim) params.append('dataFim', filtros.dataFim);

        const response = await fetch(`${this.baseUrl}/filtros?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao buscar planos');
        return response.json();
    }

    static async buscarAtivosComFiltros(filtros: Omit<PlanoDentalFiltros, 'ativo' | 'dataInicio' | 'dataFim'>): Promise<PlanoDentalResponse[]> {
        const params = new URLSearchParams();

        if (filtros.pacienteId) params.append('pacienteId', filtros.pacienteId.toString());
        if (filtros.dentistaId) params.append('dentistaId', filtros.dentistaId.toString());
        if (filtros.status) params.append('status', filtros.status);
        if (filtros.dente) params.append('dente', filtros.dente);
        if (filtros.procedimento) params.append('procedimento', filtros.procedimento);
        if (filtros.urgente !== undefined) params.append('urgente', filtros.urgente.toString());

        const response = await fetch(`${this.baseUrl}/filtros/ativos?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao buscar planos ativos');
        return response.json();
    }

    static async calcularTotalPorPacienteEStatus(pacienteId: number, status: StatusPlano): Promise<number> {
        const response = await fetch(`${this.baseUrl}/calcular-total/paciente/${pacienteId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao calcular total');
        return response.json();
    }

    static async calcularTotalPorDentistaEStatus(dentistaId: number, status: StatusPlano): Promise<number> {
        const response = await fetch(`${this.baseUrl}/calcular-total/dentista/${dentistaId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao calcular total');
        return response.json();
    }

    static async calcularValorTotalAtivos(): Promise<number> {
        const response = await fetch(`${this.baseUrl}/calcular-total/ativos`);
        if (!response.ok) throw new Error('Erro ao calcular total');
        return response.json();
    }

    static async contarAtivosPorPaciente(pacienteId: number): Promise<number> {
        const response = await fetch(`${this.baseUrl}/contar/ativos/paciente/${pacienteId}`);
        if (!response.ok) throw new Error('Erro ao contar planos');
        return response.json();
    }

    static async contarPorPacienteEStatus(pacienteId: number, status: StatusPlano): Promise<number> {
        const response = await fetch(`${this.baseUrl}/contar/paciente/${pacienteId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao contar planos');
        return response.json();
    }

    static async contarPorDentistaEStatus(dentistaId: number, status: StatusPlano): Promise<number> {
        const response = await fetch(`${this.baseUrl}/contar/dentista/${dentistaId}/status/${status}`);
        if (!response.ok) throw new Error('Erro ao contar planos');
        return response.json();
    }

    static async obterEstatisticasPorStatus(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/estatisticas/status`);
        if (!response.ok) throw new Error('Erro ao obter estatísticas');
        return response.json();
    }

    static async existePorId(id: number): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/${id}`);
        if (!response.ok) throw new Error('Erro ao verificar plano');
        return response.json();
    }

    static async estaAtivo(id: number): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/${id}/ativo`);
        if (!response.ok) throw new Error('Erro ao verificar status');
        return response.json();
    }

    static async existePlanoAtivoParaPacienteDenteProcedimento(pacienteId: number, dente: string, procedimento: string): Promise<boolean> {
        const params = new URLSearchParams({
            pacienteId: pacienteId.toString(),
            dente,
            procedimento,
        });
        const response = await fetch(`${this.baseUrl}/verificar/existe-plano-ativo?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao verificar plano');
        return response.json();
    }

    static async buscarPlanosComDataPrevistaVencida(): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/vencidos`);
        if (!response.ok) throw new Error('Erro ao buscar planos vencidos');
        return response.json();
    }

    static async buscarPlanosRecentes(): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/recentes`);
        if (!response.ok) throw new Error('Erro ao buscar planos recentes');
        return response.json();
    }

    static async buscarUrgentesRecentes(): Promise<PlanoDentalResponse[]> {
        const response = await fetch(`${this.baseUrl}/urgentes/recentes`);
        if (!response.ok) throw new Error('Erro ao buscar urgentes recentes');
        return response.json();
    }
}