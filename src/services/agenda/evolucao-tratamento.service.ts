// services/evolucao-tratamento.service.ts


import {EvolucaoFiltros, EvolucaoTratamentoRequest, EvolucaoTratamentoResponse} from "@/models/evolucao-tratamento.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class EvolucaoTratamentoService {
    private static baseUrl = `${API_URL}/api/evolucoes-tratamento`;

    static async criar(request: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar evolução');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Evolução não encontrada');
        return response.json();
    }

    static async listarTodos(): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error('Erro ao listar evoluções');
        return response.json();
    }

    static async atualizar(id: number, request: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar evolução');
        return response.json();
    }

    static async atualizarParcial(id: number, request: Partial<EvolucaoTratamentoRequest>): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar evolução');
        return response.json();
    }

    static async desativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/desativar`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao desativar evolução');
    }

    static async ativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/ativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao ativar evolução');
    }

    static async excluir(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao excluir evolução');
    }

    static async buscarPorPaciente(pacienteId: number): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções do paciente');
        return response.json();
    }

    static async buscarPorDentista(dentistaId: number): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/dentista/${dentistaId}`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções do dentista');
        return response.json();
    }

    static async buscarPorData(data: string): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/data/${data}`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções por data');
        return response.json();
    }

    static async buscarPorPeriodo(inicio: string, fim: string): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/periodo?inicio=${inicio}&fim=${fim}`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções por período');
        return response.json();
    }

    static async buscarUrgentes(): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/urgentes`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções urgentes');
        return response.json();
    }

    static async buscarComRetornoNecessario(): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/retorno-necessario`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções com retorno necessário');
        return response.json();
    }

    static async buscarRetornosAtrasados(): Promise<EvolucaoTratamentoResponse[]> {
        const response = await fetch(`${this.baseUrl}/retornos-atrasados`);
        if (!response.ok) throw new Error('Erro ao buscar retornos atrasados');
        return response.json();
    }

    static async marcarComoUrgente(id: number): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/${id}/urgente`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao marcar como urgente');
        return response.json();
    }

    static async agendarRetorno(id: number, dataRetorno: string, motivo: string): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(
            `${this.baseUrl}/${id}/agendar-retorno?dataRetorno=${dataRetorno}&motivo=${encodeURIComponent(motivo)}`,
            { method: 'POST' }
        );
        if (!response.ok) throw new Error('Erro ao agendar retorno');
        return response.json();
    }

    static async buscarComFiltros(filtros: EvolucaoFiltros): Promise<EvolucaoTratamentoResponse[]> {
        const params = new URLSearchParams();

        if (filtros.pacienteId) params.append('pacienteId', filtros.pacienteId.toString());
        if (filtros.dentistaId) params.append('dentistaId', filtros.dentistaId.toString());
        if (filtros.planoDentalId) params.append('planoDentalId', filtros.planoDentalId.toString());
        if (filtros.dataInicio) params.append('dataInicio', filtros.dataInicio);
        if (filtros.dataFim) params.append('dataFim', filtros.dataFim);
        if (filtros.tipoEvolucao) params.append('tipoEvolucao', filtros.tipoEvolucao);
        if (filtros.urgente !== undefined) params.append('urgente', filtros.urgente.toString());

        const response = await fetch(`${this.baseUrl}/filtros?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao buscar evoluções com filtros');
        return response.json();
    }

    static async contarPorPaciente(pacienteId: number): Promise<number> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/contagem`);
        if (!response.ok) throw new Error('Erro ao contar evoluções');
        return response.json();
    }

    static async buscarUltimaEvolucaoPorPaciente(pacienteId: number): Promise<EvolucaoTratamentoResponse> {
        const response = await fetch(`${this.baseUrl}/paciente/${pacienteId}/ultima`);
        if (!response.ok) throw new Error('Nenhuma evolução encontrada');
        return response.json();
    }

    static async existePorId(id: number): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/${id}/existe`);
        if (!response.ok) throw new Error('Erro ao verificar existência');
        return response.json();
    }
}