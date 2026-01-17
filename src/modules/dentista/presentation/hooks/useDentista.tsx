import { useState, useCallback } from 'react';
import {DentistaRequest} from "@/models/dentista.type";
import {CriarDentistaUseCase} from "@/modules/dentista/application/useCases/CriarDentistaUseCase";
import {ListarDentistasUseCase} from "@/modules/dentista/application/useCases/ListarDentistasUseCase";
import {AtualizarDentistaUseCase} from "@/modules/dentista/application/useCases/AtualizarDentistaUseCase";
import {DentistaResponse} from "@/modules/dentista/application/dto/DentistaDTOs";
import {AlternarStatusUseCase} from "@/modules/dentista/application/useCases/AlternarStatusUseCase";
import {DeletarDentistaUseCase} from "@/modules/dentista/application/useCases/DeletarDentistaUseCase";


export function useDentista() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    /* ---------- Listagem ---------- */
    const listar = useCallback(
        async (page = 0, size = 10, termo?: string, situacao?: 'ativo' | 'inativo' | 'todos', especialidade?: string) => {
            setLoading(true); setErro(null);
            try {
                return await new ListarDentistasUseCase().executar(page, size, termo, situacao, especialidade);
            } catch (e: any) {
                setErro(e.message ?? 'Erro ao carregar dentistas');
                throw e;
            } finally {
                setLoading(false);
            }
        }, []);

    /* ---------- Ações ---------- */
    const criar = async (d: DentistaRequest) => {
        setLoading(true); setErro(null);
        try { await new CriarDentistaUseCase().executar(d); } catch (e: any) {
            setErro(e.message ?? 'Erro ao criar'); throw e;
        } finally { setLoading(false); }
    };

    const atualizar = async (id: number, d: DentistaRequest) => {
        setLoading(true); setErro(null);
        try { await new AtualizarDentistaUseCase().executar(id, d); } catch (e: any) {
            setErro(e.message ?? 'Erro ao atualizar'); throw e;
        } finally { setLoading(false); }
    };

    const alternarStatus = async (d: DentistaResponse) => {
        setLoading(true); setErro(null);
        try { await new AlternarStatusUseCase().executar(d.id, !d.ativo); } catch (e: any) {
            setErro(e.message ?? 'Erro ao alterar status'); throw e;
        } finally { setLoading(false); }
    };

    const deletar = async (id: number) => {
        setLoading(true); setErro(null);
        try { await new DeletarDentistaUseCase().executar(id); } catch (e: any) {
            setErro(e.message ?? 'Erro ao excluir'); throw e;
        } finally { setLoading(false); }
    };

    return { listar, criar, atualizar, alternarStatus, deletar, loading, erro };
}