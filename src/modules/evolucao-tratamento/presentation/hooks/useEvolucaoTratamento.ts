"use client";
import {useCallback, useState} from "react";
import type {
  EvolucaoTratamentoFiltros,
  EvolucaoTratamentoRequest,
  EvolucaoTratamentoStats,
} from "@/modules/evolucao-tratamento";
import {ListarEvolucoesUseCase} from "@/modules/evolucao-tratamento";
import {CriarEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {AtualizarEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {DeletarEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {AlternarStatusEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {MarcarUrgenteEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {AgendarRetornoEvolucaoUseCase} from "@/modules/evolucao-tratamento";
import {EvolucaoTratamentoService} from "@/modules/evolucao-tratamento";

export function useEvolucaoTratamento() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const listar = useCallback(
    async (page = 0, size = 20, filtros?: EvolucaoTratamentoFiltros) => {
      setLoading(true);
      setErro(null);
      try {
        return await new ListarEvolucoesUseCase().executar(page, size, filtros);
      } catch (e: any) {
        setErro(e.message || "Erro ao carregar evoluções");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const criar = async (r: EvolucaoTratamentoRequest) => {
    setLoading(true);
    setErro(null);
    try {
      return await new CriarEvolucaoUseCase().executar(r);
    } catch (e: any) {
      setErro(e.message || "Erro ao criar");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const atualizar = async (id: number, r: EvolucaoTratamentoRequest) => {
    setLoading(true);
    setErro(null);
    try {
      return await new AtualizarEvolucaoUseCase().executar(id, r);
    } catch (e: any) {
      setErro(e.message || "Erro ao atualizar");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const deletar = async (id: number) => {
    setLoading(true);
    setErro(null);
    try {
      await new DeletarEvolucaoUseCase().executar(id);
    } catch (e: any) {
      setErro(e.message || "Erro ao excluir");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const alternarStatus = async (id: number, ativar: boolean) => {
    setLoading(true);
    setErro(null);
    try {
      await new AlternarStatusEvolucaoUseCase().executar(id, ativar);
    } catch (e: any) {
      setErro(e.message || "Erro ao alterar status");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const marcarUrgente = async (id: number) => {
    setLoading(true);
    setErro(null);
    try {
      return await new MarcarUrgenteEvolucaoUseCase().executar(id);
    } catch (e: any) {
      setErro(e.message || "Erro ao marcar urgente");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const agendarRetorno = async (
    id: number,
    dataRetorno: string,
    motivo: string
  ) => {
    setLoading(true);
    setErro(null);
    try {
      return await new AgendarRetornoEvolucaoUseCase().executar(
        id,
        dataRetorno,
        motivo
      );
    } catch (e: any) {
      setErro(e.message || "Erro ao agendar retorno");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const estatisticas = async (): Promise<EvolucaoTratamentoStats> => {
    try {
      return await EvolucaoTratamentoService.estatisticas();
    } catch {
      return {
        total: 0,
        porTipo: { ANAMNESE: 0, EVOLUCAO: 0, CONCLUSAO: 0, RETORNO: 0 },
        urgente: 0,
        retornoNecessario: 0,
        ativos: 0,
        inativos: 0,
      };
    }
  };

  return {
    listar,
    criar,
    atualizar,
    deletar,
    alternarStatus,
    marcarUrgente,
    agendarRetorno,
    estatisticas,
    loading,
    erro,
  };
}