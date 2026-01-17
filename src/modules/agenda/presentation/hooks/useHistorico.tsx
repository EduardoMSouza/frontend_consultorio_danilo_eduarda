import {useCallback, useState} from 'react';
import {BuscarHistoricoUseCase} from '../../application/useCases/historico';
import type {TipoAcao} from '../../application/dto/HistoricoDTOs';

export function useHistorico() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const buscarPorAgendamento = useCallback(async (agendamentoId: number) => {
        setLoading(true);
        setErro(null);
        try {
            return await new BuscarHistoricoUseCase().porAgendamento(agendamentoId);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar histórico');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarPorUsuario = useCallback(async (usuario: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new BuscarHistoricoUseCase().porUsuario(usuario);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar histórico');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarPorAcao = useCallback(async (acao: TipoAcao) => {
        setLoading(true);
        setErro(null);
        try {
            return await new BuscarHistoricoUseCase().porAcao(acao);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar histórico');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const buscarPorPeriodo = useCallback(async (inicio: string, fim: string) => {
        setLoading(true);
        setErro(null);
        try {
            return await new BuscarHistoricoUseCase().porPeriodo(inicio, fim);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar histórico');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        buscarPorAgendamento,
        buscarPorUsuario,
        buscarPorAcao,
        buscarPorPeriodo,
        loading,
        erro,
    };
}