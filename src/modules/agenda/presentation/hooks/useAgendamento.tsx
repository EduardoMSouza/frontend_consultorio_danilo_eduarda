// src/modules/agenda/presentation/hooks/useAgendamento.tsx
import {useCallback, useState} from 'react';
import {
    AtualizarAgendamentoUseCase,
    CancelarAgendamentoUseCase,
    ConcluirAgendamentoUseCase,
    ConfirmarAgendamentoUseCase,
    CriarAgendamentoUseCase,
    DeletarAgendamentoUseCase,
    IniciarAtendimentoUseCase,
    ListarAgendamentosUseCase,
    MarcarFaltaUseCase,
} from '../../application/useCases/agendamento';
import type {AgendamentoFiltros, AgendamentoRequest} from '../../application/dto/AgendamentoDTOs';

export function useAgendamento() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const listar = useCallback(async (filtros?: AgendamentoFiltros) => {
        setLoading(true);
        setErro(null);
        try {
            return await new ListarAgendamentosUseCase().executar(filtros);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar agendamentos');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const criar = async (r: AgendamentoRequest) => {
        setLoading(true);
        setErro(null);
        try {
            return await new CriarAgendamentoUseCase().executar(r);
        } catch (e: any) {
            setErro(e.message || 'Erro ao criar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const atualizar = async (id: number, r: AgendamentoRequest) => {
        setLoading(true);
        setErro(null);
        try {
            return await new AtualizarAgendamentoUseCase().executar(id, r);
        } catch (e: any) {
            setErro(e.message || 'Erro ao atualizar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const confirmar = async (id: number, usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new ConfirmarAgendamentoUseCase().executar(id, usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao confirmar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const iniciarAtendimento = async (id: number, usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new IniciarAtendimentoUseCase().executar(id, usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao iniciar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const concluir = async (id: number, usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new ConcluirAgendamentoUseCase().executar(id, usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao concluir');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const cancelar = async (id: number, motivo: string, usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new CancelarAgendamentoUseCase().executar(id, motivo, usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao cancelar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const marcarFalta = async (id: number, usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new MarcarFaltaUseCase().executar(id, usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao marcar falta');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const deletar = async (id: number) => {
        setLoading(true);
        setErro(null);
        try {
            await new DeletarAgendamentoUseCase().executar(id);
        } catch (e: any) {
            setErro(e.message || 'Erro ao excluir');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return {
        listar,
        criar,
        atualizar,
        confirmar,
        iniciarAtendimento,
        concluir,
        cancelar,
        marcarFalta,
        deletar,
        loading,
        erro,
    };
}

