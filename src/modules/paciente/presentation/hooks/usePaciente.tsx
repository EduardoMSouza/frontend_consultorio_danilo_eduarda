import { useState, useCallback } from 'react';
import {
    ListarPacientesUseCase,
    CriarPacienteUseCase,
    AtualizarPacienteUseCase,
    AlternarStatusPacienteUseCase,
    DeletarPacienteUseCase,
} from '../../application/useCases';
import type {
    PacienteRequest,
    PacienteResumoResponse,
    PageResponse,
    PacienteFiltros,
} from '../../domain/types/paciente.types';

export function usePaciente() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    /* ---------- Listagem ---------- */
    const listar = useCallback(
        async (page = 0, size = 20, filtros?: PacienteFiltros) => {
            setLoading(true); setErro(null);
            try {
                return await new ListarPacientesUseCase().executar(page, size, filtros);
            } catch (e: any) {
                setErro(e.message ?? 'Erro ao carregar pacientes');
                throw e;
            } finally {
                setLoading(false);
            }
        }, []);

    /* ---------- Ações ---------- */
    const criar = async (d: PacienteRequest) => {
        setLoading(true); setErro(null);
        try { await new CriarPacienteUseCase().executar(d); } catch (e: any) {
            setErro(e.message ?? 'Erro ao criar'); throw e;
        } finally { setLoading(false); }
    };

    const atualizar = async (id: number, d: PacienteRequest) => {
        setLoading(true); setErro(null);
        try { await new AtualizarPacienteUseCase().executar(id, d); } catch (e: any) {
            setErro(e.message ?? 'Erro ao atualizar'); throw e;
        } finally { setLoading(false); }
    };

    const alternarStatus = async (id: number, ativar: boolean) => {
        setLoading(true); setErro(null);
        try { await new AlternarStatusPacienteUseCase().executar(id, ativar); } catch (e: any) {
            setErro(e.message ?? 'Erro ao alterar status'); throw e;
        } finally { setLoading(false); }
    };

    const deletar = async (id: number) => {
        setLoading(true); setErro(null);
        try { await new DeletarPacienteUseCase().executar(id); } catch (e: any) {
            setErro(e.message ?? 'Erro ao excluir'); throw e;
        } finally { setLoading(false); }
    };

    return { listar, criar, atualizar, alternarStatus, deletar, loading, erro };
}