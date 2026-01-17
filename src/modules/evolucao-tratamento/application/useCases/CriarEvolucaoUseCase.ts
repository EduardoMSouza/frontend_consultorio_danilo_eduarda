import type { EvolucaoTratamentoRequest, EvolucaoTratamentoResponse } from "../dto/EvolucaoTratamentoDTOs";
import { EvolucaoTratamentoService } from "@/modules/evolucao-tratamento";

export class CriarEvolucaoUseCase {
  async executar(request: EvolucaoTratamentoRequest): Promise<EvolucaoTratamentoResponse> {
    return EvolucaoTratamentoService.criar(request);
  }
}