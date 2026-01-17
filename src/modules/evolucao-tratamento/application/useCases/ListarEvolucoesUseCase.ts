import type {
  EvolucaoTratamentoFiltros,
  EvolucaoTratamentoResponse,
  PageResponse,
} from "../dto/EvolucaoTratamentoDTOs";
import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class ListarEvolucoesUseCase {
  async executar(
    page: number,
    size: number,
    filtros?: EvolucaoTratamentoFiltros
  ): Promise<PageResponse<EvolucaoTratamentoResponse>> {
    if (filtros?.pacienteId)
      return EvolucaoTratamentoService.listarPorPaciente(
        filtros.pacienteId,
        page,
        size
      );
    if (filtros?.dentistaId)
      return EvolucaoTratamentoService.listarPorDentista(
        filtros.dentistaId,
        page,
        size
      );
    if (filtros?.urgente)
      return EvolucaoTratamentoService.listarUrgentes(page, size);
    if (filtros && Object.keys(filtros).length > 0)
      return EvolucaoTratamentoService.listarComFiltros(filtros, page, size);
    return EvolucaoTratamentoService.listarTodos(page, size);
  }
}