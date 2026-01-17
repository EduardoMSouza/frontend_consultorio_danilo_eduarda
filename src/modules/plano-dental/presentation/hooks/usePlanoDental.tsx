import { useState, useCallback } from 'react';
import {
    ListarPlanosUseCase,
    CriarPlanoUseCase,
    AtualizarPlanoUseCase,
    ConcluirPlanoUseCase,
    CancelarPlanoUseCase,
    AplicarDescontoUseCase,
    AlternarStatusPlanoUseCase,
    DeletarPlanoUseCase,
} from '../../application/useCases';
import type {
    PlanoDentalRequest,
    PlanoDentalResponse,
    PageResponse,
    PlanoDentalFiltros,
    PlanoDentalStats,
} from '../../application/dto/PlanoDentalDTOs';

export function usePlanoDental() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    /* ---------- lista ---------- */
    const listar = useCallback(
        async (page = 0, size = 20, filtros?: PlanoDentalFiltros) => {
            setLoading(true); setErro(null);
            try {
                return await new ListarPlanosUseCase().executar(page, size, filtros);
            } catch (e: any) {
                setErro(e.message || 'Erro ao carregar planos');
                throw e;
            } finally {
                setLoading(false);
            }
        }, []);

    /* ---------- ações ---------- */
    const criar = async (r: PlanoDentalRequest) => {
        setLoading(true); setErro(null);
        try { return await new CriarPlanoUseCase().executar(r); } catch (e: any) {
            setErro(e.message || 'Erro ao criar'); throw e;
        } finally { setLoading(false); }
    };

    const atualizar = async (id: number, r: PlanoDentalRequest) => {
        setLoading(true); setErro(null);
        try { return await new AtualizarPlanoUseCase().executar(id, r); } catch (e: any) {
            setErro(e.message || 'Erro ao atualizar'); throw e;
        } finally { setLoading(false); }
    };

    const concluir = async (id: number) => {
        setLoading(true); setErro(null);
        try { return await new ConcluirPlanoUseCase().executar(id); } catch (e: any) {
            setErro(e.message || 'Erro ao concluir'); throw e;
        } finally { setLoading(false); }
    };

    const cancelar = async (id: number, motivo: string) => {
        setLoading(true); setErro(null);
        try { return await new CancelarPlanoUseCase().executar(id, motivo); } catch (e: any) {
            setErro(e.message || 'Erro ao cancelar'); throw e;
        } finally { setLoading(false); }
    };

    const aplicarDesconto = async (id: number, desconto: number) => {
        setLoading(true); setErro(null);
        try { return await new AplicarDescontoUseCase().executar(id, desconto); } catch (e: any) {
            setErro(e.message || 'Erro ao aplicar desconto'); throw e;
        } finally { setLoading(false); }
    };

    const alternarStatus = async (id: number, ativar: boolean) => {
        setLoading(true); setErro(null);
        try { await new AlternarStatusPlanoUseCase().executar(id, ativar); } catch (e: any) {
            setErro(e.message || 'Erro ao alterar status'); throw e;
        } finally { setLoading(false); }
    };

    const deletar = async (id: number) => {
        setLoading(true); setErro(null);
        try { await new DeletarPlanoUseCase().executar(id); } catch (e: any) {
            setErro(e.message || 'Erro ao excluir'); throw e;
        } finally { setLoading(false); }
    };

    /* ---------- stats ---------- */
    const estatisticas = async () => {
        const res = await fetch('/api/planos-dentais/estatisticas/status').then(r => r.json()).catch(() => null);
        return res;
    };

    return {
        listar,
        criar,
        atualizar,
        concluir,
        cancelar,
        aplicarDesconto,
        alternarStatus,
        deletar,
        estatisticas,
        loading,
        erro,
    };
}