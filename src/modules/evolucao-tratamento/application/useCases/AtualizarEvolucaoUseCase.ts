import type { EvolucaoTratamentoRequest, EvolucaoTratamentoResponse } from "../dto/EvolucaoTratamentoDTOs";
import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class AtualizarEvolucaoUseCase {
  async executar(
    id: number,
    request: EvolucaoTratamentoRequest
  ): Promise<EvolucaoTratamentoResponse> {
    return EvolucaoTratamentoService.atualizar(id, request);
  }
}