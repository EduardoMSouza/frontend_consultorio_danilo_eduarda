import {useCallback, useState} from 'react';
import {
    AtualizarFilaEsperaUseCase,
    CancelarFilaEsperaUseCase,
    ConverterFilaEsperaUseCase,
    CriarFilaEsperaUseCase,
    DeletarFilaEsperaUseCase,
    ListarFilasEsperaUseCase,
    NotificarFilaEsperaUseCase,
} from '../../application/useCases/fila-espera';
import type {FilaEsperaFiltros, FilaEsperaRequest} from '../../application/dto/FilaEsperaDTOs';

export function useFilaEspera() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const listar = useCallback(async (filtros?: FilaEsperaFiltros) => {
        setLoading(true);
        setErro(null);
        try {
            return await new ListarFilasEsperaUseCase().executar(filtros);
        } catch (e: any) {
            setErro(e.message || 'Erro ao carregar fila');
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const criar = async (r: FilaEsperaRequest) => {
        setLoading(true);
        setErro(null);
        try {
            return await new CriarFilaEsperaUseCase().executar(r);
        } catch (e: any) {
            setErro(e.message || 'Erro ao criar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const atualizar = async (id: number, r: FilaEsperaRequest) => {
        setLoading(true);
        setErro(null);
        try {
            return await new AtualizarFilaEsperaUseCase().executar(id, r);
        } catch (e: any) {
            setErro(e.message || 'Erro ao atualizar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const notificar = async (id: number) => {
        setLoading(true);
        setErro(null);
        try {
            return await new NotificarFilaEsperaUseCase().executar(id);
        } catch (e: any) {
            setErro(e.message || 'Erro ao notificar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const converter = async (id: number, agendamentoId: number) => {
        setLoading(true);
        setErro(null);
        try {
            return await new ConverterFilaEsperaUseCase().executar(id, agendamentoId);
        } catch (e: any) {
            setErro(e.message || 'Erro ao converter');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const cancelar = async (id: number) => {
        setLoading(true);
        setErro(null);
        try {
            return await new CancelarFilaEsperaUseCase().executar(id);
        } catch (e: any) {
            setErro(e.message || 'Erro ao cancelar');
            throw e;
        } finally {
            setLoading(false);
        }
    };

    const deletar = async (id: number) => {
        setLoading(true);
        setErro(null);
        try {
            await new DeletarFilaEsperaUseCase().executar(id);
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
        notificar,
        converter,
        cancelar,
        deletar,
        loading,
        erro,
    };
}
