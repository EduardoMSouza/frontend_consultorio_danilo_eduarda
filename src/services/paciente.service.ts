// services/paciente.service.ts
import {
    PacienteRequest,
    PacienteResponse,
    PacienteResumoResponse,
    PageResponse,
    PacienteFiltros,
    EstatisticasContagem,
} from '@/models/paciente.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export class PacienteService {
    private static baseUrl = `${API_URL}/api/pacientes`;

    static async criar(request: PacienteRequest): Promise<PacienteResponse> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao criar paciente');
        return response.json();
    }

    static async buscarPorId(id: number): Promise<PacienteResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error('Paciente não encontrado');
        return response.json();
    }

    static async atualizar(id: number, request: PacienteRequest): Promise<PacienteResponse> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        if (!response.ok) throw new Error('Erro ao atualizar paciente');
        return response.json();
    }

    static async inativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/inativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao inativar paciente');
    }

    static async ativar(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}/ativar`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Erro ao ativar paciente');
    }

    static async excluir(id: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Erro ao excluir paciente');
    }

    static async buscarPorProntuario(prontuario: string): Promise<PacienteResponse> {
        const response = await fetch(`${this.baseUrl}/prontuario/${prontuario}`);
        if (!response.ok) throw new Error('Paciente não encontrado');
        return response.json();
    }

    static async buscarPorCpf(cpf: string): Promise<PacienteResponse> {
        const response = await fetch(`${this.baseUrl}/cpf/${cpf}`);
        if (!response.ok) throw new Error('Paciente não encontrado');
        return response.json();
    }

    static async buscarPorEmail(email: string): Promise<PacienteResponse> {
        const response = await fetch(`${this.baseUrl}/email/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Paciente não encontrado');
        return response.json();
    }

    static async listarTodos(): Promise<PacienteResponse[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) throw new Error('Erro ao listar pacientes');
        return response.json();
    }

    static async listarPaginado(page = 0, size = 20): Promise<PageResponse<PacienteResponse>> {
        const response = await fetch(`${this.baseUrl}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar pacientes');
        return response.json();
    }

    static async listarAtivos(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/ativos`);
        if (!response.ok) throw new Error('Erro ao listar pacientes ativos');
        return response.json();
    }

    static async listarAtivosPaginado(page = 0, size = 20): Promise<PageResponse<PacienteResponse>> {
        const response = await fetch(`${this.baseUrl}/ativos/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar pacientes ativos');
        return response.json();
    }

    static async listarInativos(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/inativos`);
        if (!response.ok) throw new Error('Erro ao listar pacientes inativos');
        return response.json();
    }

    static async listarResumo(): Promise<PacienteResumoResponse[]> {
        const response = await fetch(`${this.baseUrl}/resumo`);
        if (!response.ok) throw new Error('Erro ao listar resumo');
        return response.json();
    }

    static async listarResumoPaginado(page = 0, size = 20): Promise<PageResponse<PacienteResumoResponse>> {
        const response = await fetch(`${this.baseUrl}/resumo/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao listar resumo');
        return response.json();
    }

    static async buscarPorNome(nome: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/nome?nome=${encodeURIComponent(nome)}`);
        if (!response.ok) throw new Error('Erro ao buscar por nome');
        return response.json();
    }

    static async buscarPorNomePaginado(nome: string, page = 0, size = 20): Promise<PageResponse<PacienteResponse>> {
        const response = await fetch(`${this.baseUrl}/buscar/nome/paginado?nome=${encodeURIComponent(nome)}&page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao buscar por nome');
        return response.json();
    }

    static async buscarPorConvenio(convenio: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/convenio/${encodeURIComponent(convenio)}`);
        if (!response.ok) throw new Error('Erro ao buscar por convênio');
        return response.json();
    }

    static async buscarPorConvenioPaginado(convenio: string, page = 0, size = 20): Promise<PageResponse<PacienteResponse>> {
        const response = await fetch(`${this.baseUrl}/buscar/convenio/${encodeURIComponent(convenio)}/paginado?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Erro ao buscar por convênio');
        return response.json();
    }

    static async listarConvenios(): Promise<string[]> {
        const response = await fetch(`${this.baseUrl}/convenios`);
        if (!response.ok) throw new Error('Erro ao listar convênios');
        return response.json();
    }

    static async buscarPorDataNascimento(data: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/data-nascimento?data=${data}`);
        if (!response.ok) throw new Error('Erro ao buscar por data de nascimento');
        return response.json();
    }

    static async buscarPorDataNascimentoEntre(inicio: string, fim: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/data-nascimento/entre?inicio=${inicio}&fim=${fim}`);
        if (!response.ok) throw new Error('Erro ao buscar por período de nascimento');
        return response.json();
    }

    static async buscarAniversariantesMes(mes: number): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/aniversariantes/mes/${mes}`);
        if (!response.ok) throw new Error('Erro ao buscar aniversariantes');
        return response.json();
    }

    static async buscarPorTelefone(telefone: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/telefone?telefone=${encodeURIComponent(telefone)}`);
        if (!response.ok) throw new Error('Erro ao buscar por telefone');
        return response.json();
    }

    static async buscarComFiltros(filtros: PacienteFiltros, page = 0, size = 20): Promise<PageResponse<PacienteResponse>> {
        const params = new URLSearchParams({ page: page.toString(), size: size.toString() });

        if (filtros.nome) params.append('nome', filtros.nome);
        if (filtros.cpf) params.append('cpf', filtros.cpf);
        if (filtros.convenio) params.append('convenio', filtros.convenio);
        if (filtros.ativo !== undefined) params.append('ativo', filtros.ativo.toString());
        if (filtros.status !== undefined) params.append('status', filtros.status.toString());

        const response = await fetch(`${this.baseUrl}/filtros?${params.toString()}`);
        if (!response.ok) throw new Error('Erro ao buscar com filtros');
        return response.json();
    }

    static async buscarPorFaixaEtaria(idadeMin: number, idadeMax: number): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/faixa-etaria?idadeMin=${idadeMin}&idadeMax=${idadeMax}`);
        if (!response.ok) throw new Error('Erro ao buscar por faixa etária');
        return response.json();
    }

    static async buscarMenores(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/menores`);
        if (!response.ok) throw new Error('Erro ao buscar menores de idade');
        return response.json();
    }

    static async verificarProntuario(prontuario: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/prontuario/${prontuario}`);
        if (!response.ok) throw new Error('Erro ao verificar prontuário');
        return response.json();
    }

    static async verificarCpf(cpf: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/cpf/${cpf}`);
        if (!response.ok) throw new Error('Erro ao verificar CPF');
        return response.json();
    }

    static async verificarEmail(email: string): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/verificar/email/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Erro ao verificar email');
        return response.json();
    }

    static async getEstatisticasContagem(): Promise<EstatisticasContagem> {
        const response = await fetch(`${this.baseUrl}/estatisticas/contagem`);
        if (!response.ok) throw new Error('Erro ao obter estatísticas');
        return response.json();
    }

    static async getEstatisticasConvenio(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/estatisticas/convenio`);
        if (!response.ok) throw new Error('Erro ao obter estatísticas por convênio');
        return response.json();
    }

    static async getEstatisticasFaixaEtaria(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/estatisticas/faixa-etaria`);
        if (!response.ok) throw new Error('Erro ao obter estatísticas por faixa etária');
        return response.json();
    }

    static async getEstatisticasMesCadastro(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/estatisticas/mes-cadastro`);
        if (!response.ok) throw new Error('Erro ao obter estatísticas por mês de cadastro');
        return response.json();
    }

    static async buscarComDiabetes(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/saude/diabetes`);
        if (!response.ok) throw new Error('Erro ao buscar pacientes com diabetes');
        return response.json();
    }

    static async buscarComHipertensao(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/saude/hipertensao`);
        if (!response.ok) throw new Error('Erro ao buscar pacientes com hipertensão');
        return response.json();
    }

    static async buscarFumantes(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/saude/fumantes`);
        if (!response.ok) throw new Error('Erro ao buscar pacientes fumantes');
        return response.json();
    }

    static async buscarComResponsavel(): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/responsaveis`);
        if (!response.ok) throw new Error('Erro ao buscar pacientes com responsável');
        return response.json();
    }

    static async buscarPorResponsavel(nome: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/buscar/responsavel?nome=${encodeURIComponent(nome)}`);
        if (!response.ok) throw new Error('Erro ao buscar por responsável');
        return response.json();
    }

    static async gerarRelatorioCadastro(inicio: string, fim: string): Promise<PacienteResponse[]> {
        const response = await fetch(`${this.baseUrl}/relatorios/cadastro?inicio=${inicio}&fim=${fim}`);
        if (!response.ok) throw new Error('Erro ao gerar relatório');
        return response.json();
    }

    static async gerarRelatorioNaturalidades(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/relatorios/naturalidades`);
        if (!response.ok) throw new Error('Erro ao gerar relatório de naturalidades');
        return response.json();
    }

    static async gerarRelatorioNovos12Meses(): Promise<any[]> {
        const response = await fetch(`${this.baseUrl}/relatorios/novos-12-meses`);
        if (!response.ok) throw new Error('Erro ao gerar relatório');
        return response.json();
    }
}