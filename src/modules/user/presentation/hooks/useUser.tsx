import { useState, useCallback } from 'react';
import {
    ListarUsersUseCase,
    CriarUserUseCase,
    AtualizarUserUseCase,
    AlternarStatusUserUseCase,
    DeletarUserUseCase,
} from '../../application/useCases';
import type { UserRequest, UserResponse, PageResponse, UserFiltros, UserStats } from '../../application/dto/UserDTOs';

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    /* ---------- lista ---------- */
    const listar = useCallback(
        async (page = 0, size = 20, filtros?: UserFiltros) => {
            setLoading(true); setErro(null);
            try {
                return await new ListarUsersUseCase().executar(page, size, filtros);
            } catch (e: any) {
                setErro(e.message || 'Erro ao carregar usuários');
                throw e;
            } finally {
                setLoading(false);
            }
        }, []);

    /* ---------- ações ---------- */
    const criar = async (r: UserRequest) => {
        setLoading(true); setErro(null);
        try { return await new CriarUserUseCase().executar(r); } catch (e: any) {
            setErro(e.message || 'Erro ao criar'); throw e;
        } finally { setLoading(false); }
    };

    const atualizar = async (id: number, r: UserRequest) => {
        setLoading(true); setErro(null);
        try { return await new AtualizarUserUseCase().executar(id, r); } catch (e: any) {
            setErro(e.message || 'Erro ao atualizar'); throw e;
        } finally { setLoading(false); }
    };

    const alternarStatus = async (id: number, ativar: boolean) => {
        setLoading(true); setErro(null);
        try { await new AlternarStatusUserUseCase().executar(id, ativar); } catch (e: any) {
            setErro(e.message || 'Erro ao alterar status'); throw e;
        } finally { setLoading(false); }
    };

    const deletar = async (id: number) => {
        setLoading(true); setErro(null);
        try { await new DeletarUserUseCase().executar(id); } catch (e: any) {
            setErro(e.message || 'Erro ao excluir'); throw e;
        } finally { setLoading(false); }
    };

    /* ---------- estatísticas ---------- */
    const estatisticas = async () => {
        const res = await fetch('/api/users/estatisticas').then(r => r.json()).catch(() => null);
        return res;
    };

    return { listar, criar, atualizar, alternarStatus, deletar, estatisticas, loading, erro };
}